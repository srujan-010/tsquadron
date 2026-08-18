/**
 * Cloudinary Client Utility for TSquadron
 * Strictly secure client-side upload handler.
 * NEVER exposes CLOUDINARY_API_SECRET to the browser.
 */

const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dixbhnqnf',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'tsquadron_clients'
};

/**
 * Upload an image file or Data URL via backend endpoint or unsigned preset fallback.
 * @param {File|Blob|string} file - The file object or base64 data URI
 * @param {Object} options - { folder, name }
 * @returns {Promise<{ secure_url: string, public_id: string, success: boolean }>}
 */
export async function uploadImageToCloudinary(file, options = {}) {
  let filePayload = file;

  // If passed a File/Blob instance, read as base64 first
  if (file instanceof Blob || file instanceof File) {
    filePayload = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  }

  // Attempt 1: Server-Side Backend Upload Endpoint (/api/upload)
  try {
    const response = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: filePayload,
        folder: options.folder || 'tsquadron/clients',
        name: options.name || (file?.name ? file.name : 'client-logo')
      })
    });

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      if (response.ok && data.secure_url) {
        return data;
      }
    }
  } catch (err) {
    console.warn('/api/upload endpoint unavailable, using unsigned REST fallback:', err.message);
  }

  // Attempt 2: Unsigned Direct Cloudinary Upload (No API secret required)
  const formData = new FormData();
  formData.append('file', filePayload);
  formData.append('folder', options.folder || 'tsquadron/clients');
  if (CLOUDINARY_CONFIG.uploadPreset) {
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (!response.ok || !data.secure_url) {
    throw new Error(data?.error?.message || `Cloudinary upload failed with status ${response.status}`);
  }

  return {
    success: true,
    secure_url: data.secure_url,
    url: data.secure_url,
    public_id: data.public_id,
    format: data.format,
    bytes: data.bytes
  };
}

/**
 * Safely migrates any client records containing Base64 data URIs to Cloudinary secure URLs
 * @param {Array} clients - Array of client records
 * @returns {Promise<{ updated: boolean, clients: Array, migratedCount: number }>}
 */
export async function migrateBase64ClientsToCloudinary(clients) {
  if (!Array.isArray(clients) || clients.length === 0) {
    return { updated: false, clients, migratedCount: 0 };
  }

  let updated = false;
  let migratedCount = 0;
  const migratedClients = [...clients];

  for (let i = 0; i < migratedClients.length; i++) {
    const client = migratedClients[i];
    if (client.logoUrl && typeof client.logoUrl === 'string' && client.logoUrl.startsWith('data:image/')) {
      console.log(`[Cloudinary Migration] Migrating Base64 logo for client "${client.name}"...`);
      try {
        const result = await uploadImageToCloudinary(client.logoUrl, {
          folder: 'tsquadron/clients',
          name: client.name || `client-${client.id}`
        });

        if (result && result.secure_url) {
          migratedClients[i] = {
            ...client,
            logoUrl: result.secure_url,
            updatedAt: new Date().toISOString()
          };
          updated = true;
          migratedCount++;
          console.log(`[Cloudinary Migration] Successfully migrated "${client.name}" -> ${result.secure_url}`);
        }
      } catch (err) {
        console.error(`[Cloudinary Migration] Failed to migrate logo for "${client.name}":`, err.message);
      }
    }
  }

  return { updated, clients: migratedClients, migratedCount };
}
