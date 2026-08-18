/**
 * Cloudinary Client Utility for TSquadron
 * Handles client-to-backend upload requests and legacy Base64 migrations.
 */

/**
 * Upload an image file or Data URL to Cloudinary via backend endpoint
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

  const data = await response.json();
  if (!response.ok || !data.secure_url) {
    throw new Error(data.error || `Upload failed with status ${response.status}`);
  }

  return data;
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
