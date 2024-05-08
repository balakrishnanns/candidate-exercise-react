/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';



// import 'assets/scss/main.scss';
// import './normalinput.scss';
import { Form, InputGroup } from 'react-bootstrap';
// import { FormErrorMessage } from 'components/common/FormErrorMessage';
// import { getFormErrorMessage } from 'helpers/utis';
import { Controller } from 'react-hook-form';
import { ConnectForm } from '../../../context';

/**
 * Normal Input: The Common Re-usable Input button across website.
 * @return {JSX.Element} The JSX Code for Input
 */

export function NormalInput({
  label,
  type,
  bgColor,
  helperIcon,
  name,
  rules,
  viewOnly,
  fieldArrayName,
  placeholder,
  inputBg,
  autoComplete,
  onKeyDown,
  ...restProps
}) {
  const inputProps = {};

  if (type === 'textarea') {
    inputProps.as = 'textarea';
  }
  return (
    <ConnectForm>
      {({ errors, control, watch }) => (
        <div className={`custom-normalinput ${bgColor ? 'input-bg' : ''}`}>
          <Form.Group>
            {label && (
              <Form.Label
                className="form-label fs-16 fw-500 font-poppins-dw"
                title={label}
                htmlFor={name}
              >
                {label}
              </Form.Label>
            )}
            {viewOnly && <p>{name && watch(name)}</p>}

            {!viewOnly && (
              <div className="input-block">
                <Controller
                  name={name}
                  control={control}
                  rules={{ ...rules }}
                  render={({
                    field: { onChange, value: fieldValue, ref, props }
                  }) => (
                    <InputGroup>
                      <Form.Control
                        {...props}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        value={fieldValue || ''}
                        ref={ref}
                        type={type}
                        className={inputBg ? 'adminInput' : 'mainInput'}
                        placeholder={placeholder}
                        id={name}
                        {...restProps}
                        {...inputProps}
                        autoComplete={autoComplete}
                      />
                      {helperIcon && (
                        <button className="helper-icon" type="button">
                          <i className={`icon-${helperIcon}`} />
                        </button>
                      )}
                    </InputGroup>
                  )}
                />

                {/* <FormErrorMessage
                  error={getFo(errors, fieldArrayName, name)}
                /> */}
              </div>
            )}
          </Form.Group>
        </div>
      )}
    </ConnectForm>
  );
}




