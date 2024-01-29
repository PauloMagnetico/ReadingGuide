import React from 'react';
import classNames from 'classnames';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

type AlertProps = {
  children: React.ReactNode;
  severity: 'info' | 'warning' | 'error' | 'success';
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  severity, // 'info', 'warning', 'error', or 'success'
  ...rest
}) => {
  const classes = classNames(
    rest.className,
    'flex items-center border px-4 py-3 rounded relative',
    {
      'border-sky-500 bg-sky-100 text-sky-700': severity === 'info',
      'border-amber-500 bg-amber-100 text-amber-700': severity === 'warning',
      'border-lime-500 bg-lime-100 text-lime-700': severity === 'success',
      'bg-red-100 border border-red-400 text-red-700': severity === 'error',
    }
  );

  const Icon = severity === 'info' ? InfoOutlinedIcon :
              severity === 'warning' ? WarningAmberRoundedIcon :
              severity === 'error' ? ErrorOutlineRoundedIcon :
              severity === 'success' ? CheckCircleOutlineOutlinedIcon : null;

  return (
    <div {...rest} className={classes}>
      {Icon && <Icon className='mr-2' />}
      {children}
    </div>
  );
}

export default Alert;
