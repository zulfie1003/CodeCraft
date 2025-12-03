import React from 'react';
import { Check, X } from 'lucide-react';

interface PasswordStrengthIndicatorProps {
  password: string;
}

export const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const requirements = [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) }
  ];

  const metCount = requirements.filter(req => req.met).length;
  const strength = password.length === 0 ? 'none' : metCount === 4 ? 'strong' : metCount >= 2 ? 'medium' : 'weak';

  const strengthColor = {
    none: 'bg-gray-500/20',
    weak: 'bg-red-500/20',
    medium: 'bg-yellow-500/20',
    strong: 'bg-green-500/20'
  };

  return (
    <div className="space-y-2 mt-2 p-3 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${strengthColor[strength]}`} />
        <span className="text-xs font-medium text-muted-foreground">
          Password strength: <span className="text-foreground capitalize">{strength}</span>
        </span>
      </div>
      <div className="space-y-1">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs">
            {req.met ? (
              <Check className="w-3 h-3 text-green-500" />
            ) : (
              <X className="w-3 h-3 text-red-500/50" />
            )}
            <span className={req.met ? 'text-green-500' : 'text-muted-foreground'}>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
