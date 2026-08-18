// InsForge / Serverless Edge Function for TSquadron Clients API
// Deployment: `insforge functions deploy clients`

const DEFAULT_CLIENTS = [
  {
    id: 1,
    name: "Sai Chandar Child Neuro Care",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041058/tsquadron/clients/gubtsypjwrysdqfuvnhq.png",
    displayOrder: 1,
    isActive: true
  },
  {
    id: 2,
    name: "IRA Childrens Hospital",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041059/tsquadron/clients/bgu6j3sklj39z46e9c5r.png",
    displayOrder: 2,
    isActive: true
  },
  {
    id: 3,
    name: "IMA Warangal",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041060/tsquadron/clients/lcynjxzy45bfryihxoeq.jpg",
    displayOrder: 3,
    isActive: true
  },
  {
    id: 4,
    name: "Teja International High School",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041061/tsquadron/clients/drjy6gvdztfrovqdcyuf.png",
    displayOrder: 4,
    isActive: true
  },
  {
    id: 5,
    name: "Sri Sharanya Hospital",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041061/tsquadron/clients/ei1zj3o3qlcooc5kyv1d.jpg",
    displayOrder: 5,
    isActive: true
  },
  {
    id: 6,
    name: "Vinayaka Neuro",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041062/tsquadron/clients/rqlsj1n0xxzdyoob2a46.jpg",
    displayOrder: 6,
    isActive: true
  },
  {
    id: 7,
    name: "Swastika Sarees",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041063/tsquadron/clients/mspvgxsxuvblhxduvh8e.jpg",
    displayOrder: 7,
    isActive: true
  },
  {
    id: 8,
    name: "Suryodaya Farms",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041063/tsquadron/clients/rxpkkfxtetqcdut2apo2.png",
    displayOrder: 8,
    isActive: true
  },
  {
    id: 9,
    name: "Niyo Dental Care",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041064/tsquadron/clients/auezyx2iqha0fdu6rbhh.png",
    displayOrder: 9,
    isActive: true
  },
  {
    id: 10,
    name: "Sunshine Dental Clinic",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041065/tsquadron/clients/vnqoyayuvzsifbizccw0.jpg",
    displayOrder: 10,
    isActive: true
  },
  {
    id: 11,
    name: "Maatha Sri Women's and Children's Hospital",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041066/tsquadron/clients/np2bxrfzsyvyntehsr4d.jpg",
    displayOrder: 11,
    isActive: true
  },
  {
    id: 12,
    name: "Prasta Clinique",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041066/tsquadron/clients/ncjjldtchmmexskzlmhz.jpg",
    displayOrder: 12,
    isActive: true
  },
  {
    id: 13,
    name: "Sri Chakra Superspeciality Hospital",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041067/tsquadron/clients/kmb4t1wlc0wiiqm6n2ci.jpg",
    displayOrder: 13,
    isActive: true
  },
  {
    id: 14,
    name: "Aegesis",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041067/tsquadron/clients/m38qwdo8n7dhtivruoon.jpg",
    displayOrder: 14,
    isActive: true
  },
  {
    id: 15,
    name: "Facttax",
    logoUrl: "https://res.cloudinary.com/dixbhnqnf/image/upload/v1787041068/tsquadron/clients/grwwoesmdcdeb8sbresi.jpg",
    displayOrder: 15,
    isActive: true
  }
];

export default async function handler(req) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers });
  }

  try {
    const url = new URL(req.url);
    const activeOnly = url.searchParams.get('active') === 'true';

    if (req.method === 'GET') {
      let result = DEFAULT_CLIENTS;
      if (activeOnly) {
        result = DEFAULT_CLIENTS.filter(c => c.isActive !== false);
      }
      result.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
      return new Response(JSON.stringify(result), { status: 200, headers });
    }

    return new Response(JSON.stringify({ success: true, clients: DEFAULT_CLIENTS }), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}
