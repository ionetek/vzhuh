import cn from 'clsx';
import { FC, FormEvent, useRef } from 'react';

type Props = {
  label?: string;
  name?: string;
  placeholder?: string;
  variant?: 'lg' | 'xl';
  className?: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  value?: string;
  maxLength?: number;
  type?: 'text' | 'number';
  disabled?: boolean;
  autoFocus?: boolean;
  bgColor?: 'transparent' | 'gray';
  onBlur?: () => void;
  keepFocus?: boolean;
  pattern?: string;
  autoCapitalize?: string;
  autoComplete?: string;
  autoCorrect?: string;
};
export const Input: FC<Props> = ({
  label,
  name = '',
  variant = 'xl',
  placeholder = '',
  className,
  value = '',
  maxLength,
  onChange,
  type = 'text',
  disabled = false,
  autoFocus = false,
  bgColor = 'gray',
  keepFocus = false,
  onBlur,
  pattern,
  autoCapitalize,
  autoCorrect,
  autoComplete,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <label
      className={cn('flex flex-col', {
        'gap-1': variant === 'lg',
        'gap-2': variant === 'xl',
      })}
    >
      <div className={cn('text-slate-400', variant === 'lg' && 'text-sm')}>{label}</div>
      <input
        className={cn('w-full appearance-none', 'outline-none', className, {
          //Variants
          'h-14 rounded-3xl px-6 py-3': variant === 'xl',
          'h-12 rounded-xl px-3 py-1': variant === 'lg',

          //bgColor
          'bg-slate-200': bgColor === 'gray',
          'border-[1px] border-solid bg-transparent': bgColor === 'transparent',
        })}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        autoFocus={autoFocus}
        disabled={disabled}
        onBlur={(e) => {
          e.preventDefault();
          keepFocus && inputRef.current?.focus();
          onBlur?.();
        }}
        ref={inputRef}
        pattern={pattern}
        autoCapitalize={autoCapitalize}
        autoComplete={autoComplete}
        autoCorrect={autoCorrect}
      />
    </label>
  );
};
