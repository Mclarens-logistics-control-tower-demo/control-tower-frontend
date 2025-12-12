"use client";
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { createShipment } from '@/lib/shipments';

interface AddShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddShipmentModal({ isOpen, onClose }: AddShipmentModalProps) {
  const [formData, setFormData] = useState({
    vesselName: '',
    imo: '',
    containerId: '',
    polCode: '',
    podCode: '',
    polLat: '',
    polLon: '',
    podLat: '',
    podLon: '',
    speed: '15',
    status: 'SAFE' as 'SAFE' | 'WARNING' | 'CRITICAL'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const etaDays = 15 + Math.floor(Math.random() * 10);
      await createShipment({
        vesselName: formData.vesselName,
        imo: formData.imo,
        containerId: formData.containerId,
        polCode: formData.polCode.toUpperCase(),
        podCode: formData.podCode.toUpperCase(),
        polLat: parseFloat(formData.polLat) || 0,
        polLon: parseFloat(formData.polLon) || 0,
        podLat: parseFloat(formData.podLat) || 0,
        podLon: parseFloat(formData.podLon) || 0,
        carrierEta: new Date(Date.now() + etaDays * 86400000).toISOString(),
        predictedEta: new Date(Date.now() + (etaDays + 1) * 86400000).toISOString(),
        etaDelta: "On Time",
        status: formData.status,
        riskScore: formData.status === 'CRITICAL' ? 80 : formData.status === 'WARNING' ? 50 : 15,
        voyageStatus: formData.status === 'CRITICAL' ? 'Critical' : formData.status === 'WARNING' ? 'Warning' : 'On Time',
        speed: parseInt(formData.speed) || 15,
        progress: 25 + Math.floor(Math.random() * 50),
        daysToArrival: etaDays,
        lastUpdate: new Date().toISOString(),
      });

      // Reset form and close
      setFormData({
        vesselName: '',
        imo: '',
        containerId: '',
        polCode: '',
        podCode: '',
        polLat: '',
        polLon: '',
        podLat: '',
        podLon: '',
        speed: '15',
        status: 'SAFE'
      });
      onClose();
    } catch (error) {
      console.error('Failed to add shipment:', error);
      alert('Failed to add shipment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
          <h2 className="text-xl font-bold text-slate-900">Add New Shipment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Vessel Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Vessel Name *</label>
              <input
                type="text"
                name="vesselName"
                value={formData.vesselName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., MAERSK ESSEX"
              />
            </div>

            {/* IMO */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">IMO Number *</label>
              <input
                type="text"
                name="imo"
                value={formData.imo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 9632080"
              />
            </div>

            {/* Container ID */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Container ID *</label>
              <input
                type="text"
                name="containerId"
                value={formData.containerId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., MAEU7392847"
              />
            </div>

            {/* POL Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Port of Loading (POL) *</label>
              <input
                type="text"
                name="polCode"
                value={formData.polCode}
                onChange={handleChange}
                required
                maxLength={5}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                placeholder="e.g., SGSIN"
              />
            </div>

            {/* POD Code */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Port of Discharge (POD) *</label>
              <input
                type="text"
                name="podCode"
                value={formData.podCode}
                onChange={handleChange}
                required
                maxLength={5}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                placeholder="e.g., USNYC"
              />
            </div>

            {/* POL Coordinates */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">POL Latitude *</label>
              <input
                type="number"
                step="any"
                name="polLat"
                value={formData.polLat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 1.264"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">POL Longitude *</label>
              <input
                type="number"
                step="any"
                name="polLon"
                value={formData.polLon}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 103.84"
              />
            </div>

            {/* POD Coordinates */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">POD Latitude *</label>
              <input
                type="number"
                step="any"
                name="podLat"
                value={formData.podLat}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 40.684"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">POD Longitude *</label>
              <input
                type="number"
                step="any"
                name="podLon"
                value={formData.podLon}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., -74.006"
              />
            </div>

            {/* Speed */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Speed (knots)</label>
              <input
                type="number"
                name="speed"
                value={formData.speed}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="15"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="SAFE">Safe</option>
                <option value="WARNING">Warning</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3 bg-slate-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-700 hover:bg-slate-200 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Adding...' : 'Add Shipment'}
          </button>
        </div>
      </div>
    </div>
  );
}
