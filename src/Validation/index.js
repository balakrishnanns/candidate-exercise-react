import * as yup from 'yup';

export const forgotPasswordSchema = (label) => {
    return yup.object({
      mobileNumber: yup
        .string()
        .min(10, 'Phone number should be 10 digits')
        .max(10, 'Phone number should be 10 digits')
        .matches(/^[0-9]*$/, 'Phone number should be numeric')
        .required(label?.validateMobileNo),

    });
  };