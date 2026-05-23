import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaCheck, FaTimes, FaTrash, FaSearch } from 'react-icons/fa';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [slots, setSlots] = useState({ availableSlots: [], disabledDates: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [newSlot, setNewSlot] = useState('');

  const fetchAppointments = async () => {
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSlots = async () => {
    try {
      const res = await fetch('/api/slots');
      const data = await res.json();
      setSlots(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchSlots();
    setLoading(false);
    
    // Auto refresh every 30 seconds for live admin updates
    const interval = setInterval(fetchAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      fetchAppointments();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      fetchAppointments();
    } catch (e) {
      console.error(e);
    }
  };

  const addSlot = async () => {
    if (!newSlot.trim()) return;
    const updatedSlots = { ...slots, availableSlots: [...slots.availableSlots, newSlot.trim()] };
    await fetch('/api/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSlots)
    });
    setSlots(updatedSlots);
    setNewSlot('');
  };

  const removeSlot = async (slotToRemove) => {
    const updatedSlots = { 
      ...slots, 
      availableSlots: slots.availableSlots.filter(s => s !== slotToRemove) 
    };
    await fetch('/api/slots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSlots)
    });
    setSlots(updatedSlots);
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesSearch = app.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.service?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments Manager</h1>
          <p className="text-slate-500 text-sm mt-1">Manage AI chatbot bookings and time slots.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Appointments Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search bookings..." 
                className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <select 
              className="px-4 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-brand-cyan"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Service</th>
                  <th className="px-6 py-3 font-semibold">Date &amp; Time</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading bookings...</td></tr>
                ) : filteredAppointments.length === 0 ? (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No appointments found.</td></tr>
                ) : (
                  filteredAppointments.map(app => (
                    <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-800">{app.name}</div>
                        <div className="text-xs text-slate-500">{app.email}</div>
                        <div className="text-xs text-slate-500">{app.phone}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{app.service}</td>
                      <td className="px-6 py-4 text-slate-700">
                        <div className="flex items-center space-x-2">
                          <FaCalendarAlt className="text-slate-400" />
                          <span>{app.date} at {app.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          app.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                          app.status === 'Completed' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          {app.status === 'Pending' && (
                            <button onClick={() => updateStatus(app.id, 'Confirmed')} className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded transition-colors" title="Confirm">
                              <FaCheck size={14} />
                            </button>
                          )}
                          {(app.status === 'Pending' || app.status === 'Confirmed') && (
                            <button onClick={() => updateStatus(app.id, 'Cancelled')} className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded transition-colors" title="Cancel">
                              <FaTimes size={14} />
                            </button>
                          )}
                          <button onClick={() => deleteAppointment(app.id)} className="p-1.5 bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-red-600 rounded transition-colors" title="Delete">
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Slot Management */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 h-fit">
          <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Slot Management</h3>
          
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-slate-600 mb-3">Available Time Slots</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {slots.availableSlots.map((slot, i) => (
                <div key={i} className="flex items-center space-x-2 bg-brand-cyan/10 text-brand-cyan px-3 py-1.5 rounded-lg text-sm font-medium border border-brand-cyan/20">
                  <span>{slot}</span>
                  <button onClick={() => removeSlot(slot)} className="text-brand-cyan hover:text-red-500 transition-colors">
                    <FaTimes size={12} />
                  </button>
                </div>
              ))}
              {slots.availableSlots.length === 0 && (
                <span className="text-sm text-slate-400 italic">No slots configured.</span>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                value={newSlot}
                onChange={e => setNewSlot(e.target.value)}
                placeholder="e.g. 10:00 AM" 
                className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-cyan"
                onKeyPress={e => e.key === 'Enter' && addSlot()}
              />
              <button onClick={addSlot} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-lg transition-colors">
                Add
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-600 mb-2">Notice</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              These slots are provided to the AI Chatbot when a customer requests a consultation. Ensure your slots accurately reflect your team's availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
