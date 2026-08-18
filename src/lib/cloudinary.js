/**
 * Cloudinary Client Utility for TSquadron
 * Handles client-to-backend and direct Cloudinary upload requests and legacy Base64 migrations.
 */

const CLOUDINARY_CONFIG = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dixbhnqnf',
  apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || '913984349889251',
  apiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET || 'pGPh6FyorqalsPQzKkTcgshrt-4',
  uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || ''
};

/**
 * Computes SHA-1 hash in browser/client using Web Crypto API
 * @param {string} message 
 * @returns {Promise<string>} hex-encoded SHA-1 hash
 */
async function generateSha1(message) {
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Direct signed upload to Cloudinary API
 * @param {string|File|Blob} filePayload 
 * @param {Object} options 
 * @returns {Promise<{ secure_url: string, public_id: string, success: boolean }>}
 */
async function uploadDirectToCloudinary(filePayload, options = {}) {
  const { cloudName, apiKey, apiSecret, uploadPreset } = CLOUDINARY_CONFIG;
  const folder = options.folder || 'tsquadron/clients';
  const timestamp = Math.round(Date.now() / 1000);

  const formData = new FormData();
  formData.append('file', filePayload);
  formData.append('folder', folder);

  if (apiKey && apiSecret) {
    formData.append('api_key', apiKey);
    formData.append('timestamp', String(timestamp));

    const stringToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = await generateSha1(stringToSign);
    formData.append('signature', signature);
  } else if (uploadPreset) {
    formData.append('upload_preset', uploadPreset);
  }

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const response = await fetch(endpoint, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (!response.ok || !data.secure_url) {
    throw new Error(data?.error?.message || `Direct Cloudinary upload failed with status ${response.status}`);
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
 * Upload an image file or Data URL to Cloudinary
 * Attempts backend /api/upload first; if running on static host (which returns HTML), falls back to direct signed Cloudinary upload.
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

  // Attempt 1: Try backend /api/upload endpoint
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
    console.warn('/api/upload backend not available, falling back to direct Cloudinary signed upload:', err.message);
  }

  // Attempt 2: Fallback to direct signed Cloudinary REST API upload
  return await uploadDirectToCloudinary(filePayload, options);
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
