import React from 'react';

const services = [
  {
    id: 'insurance',
    name: 'Insurance',
    description: 'Full coverage insurance',
    price: 25,
    icon: '🛡️'
  },
  {
    id: 'gps',
    name: 'GPS Navigation',
    description: 'Built-in GPS system',
    price: 10,
    icon: '🗺️'
  },
  {
    id: 'childSeat',
    name: 'Child Seat',
    description: 'Safety-certified child seat',
    price: 15,
    icon: '🪑'
  },
  {
    id: 'additionalDriver',
    name: 'Additional Driver',
    description: 'Register an extra driver',
    price: 20,
    icon: '👥'
  }
];

const ServiceSelector = ({ selectedServices, onServiceToggle }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Additional Services</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            className={`
              relative flex items-start p-4 rounded-lg border
              ${
                selectedServices.includes(service.id)
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200'
              }
              cursor-pointer hover:border-green-500 transition-colors
            `}
            onClick={() => onServiceToggle(service.id)}
          >
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                checked={selectedServices.includes(service.id)}
                onChange={() => onServiceToggle(service.id)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center">
                <span className="mr-2 text-xl">{service.icon}</span>
                <label className="font-medium text-gray-900">
                  {service.name}
                </label>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                {service.description}
              </p>
              <p className="text-green-600 font-medium mt-1">
                ${service.price}/day
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector; 