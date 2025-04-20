import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  tags?: string[];
  children?: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  image,
  tags,
  children,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm overflow-hidden ${className}`}>
      {image && (
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <div className="p-6">
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {title}
          </h3>
        )}
        {description && (
          <p className="text-gray-600 mb-4">
            {description}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}; 