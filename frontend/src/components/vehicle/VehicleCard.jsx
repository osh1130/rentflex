import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const VehicleCard = ({
  id,
  make,
  model,
  year,
  mileage,
  available_now,
  minimum_rent_period,
  maximum_rent_period,
  seats,
  price_per_day,
  image_url,
  isAdmin = false,
  onEdit,
  onDelete
}) => {
  const name = `${make || ''} ${model || ''} ${year || ''}`.trim();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image_url || 'https://via.placeholder.com/400x225?text=No+Image'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-green-600 font-semibold">
            ${typeof price_per_day === 'number' ? price_per_day : '--'}/day
          </p>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500 flex-wrap">
            <span className="mr-4">Seats: {seats ?? '--'}</span>
            <span className="mr-4">Mileage: {mileage ?? '--'} km</span>
            <span className="mr-4">Available: {available_now ? 'Yes' : 'No'}</span>
            <span className="mr-4">Min Rent: {minimum_rent_period ?? '--'}d</span>
            <span className="mr-4">Max Rent: {maximum_rent_period ?? '--'}d</span>
          </div>
        </div>
        {isAdmin ? (
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit?.(id)}>Edit</Button>
            <Button variant="danger" size="sm" className="flex-1" onClick={() => onDelete?.(id)}>Delete</Button>
          </div>
        ) : (
          <Link to={`/vehicles/${id}`}>
            <Button className="w-full">View Details</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default VehicleCard; 