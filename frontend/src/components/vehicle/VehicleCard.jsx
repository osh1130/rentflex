import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const VehicleCard = ({
  id,
  name,
  image,
  price,
  type,
  seats,
  transmission,
  isAdmin = false,
  onEdit,
  onDelete
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={image || 'https://via.placeholder.com/400x225?text=No+Image'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-green-600 font-semibold">
            ${price}/day
          </p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-4">
              <i className="fas fa-car mr-1"></i> {type}
            </span>
            <span className="mr-4">
              <i className="fas fa-users mr-1"></i> {seats} seats
            </span>
            <span>
              <i className="fas fa-cog mr-1"></i> {transmission}
            </span>
          </div>
        </div>

        {isAdmin ? (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onEdit?.(id)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="flex-1"
              onClick={() => onDelete?.(id)}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Link to={`/vehicles/${id}`}>
            <Button className="w-full">
              View Details
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default VehicleCard; 