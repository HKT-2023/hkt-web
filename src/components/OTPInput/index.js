/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState, useEffect, useRef } from 'react'
// keyCode constants
const BACKSPACE = 8
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DELETE = 46
const SPACEBAR = 32

const isStyleObject = (obj) => typeof obj === 'object'

function SingleOtpInput(props) {
  const {
    placeholder,
    separator,
    isLastChild,
    inputStyle,
    focus,
    isDisabled,
    hasErrored,
    errorStyle,
    focusStyle,
    disabledStyle,
    isInputNum,
    index,
    value,
    className,
    ...rest
  } = props

  const inputRef = useRef()

  useEffect(() => {
    const { focus, shouldAutoFocus } = props
    const { current: inputEl } = inputRef

    if (inputEl && focus && shouldAutoFocus) {
      inputEl.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { current: inputEl } = inputRef
    if (inputEl && focus) {
      inputEl.focus()
      inputEl.select()
    }
  }, [focus])

  const getClasses = (...classes) =>
    classes.filter((c) => !isStyleObject(c) && c !== false).join(' ')

  const getType = () => {
    const { isInputSecure, isInputNum } = props

    if (isInputSecure) {
      return 'password'
    }

    if (isInputNum) {
      return 'tel'
    }

    return 'text'
  }

  return (
    <div className={className} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        aria-label={`${index === 0 ? 'Please enter verification code. ' : ''}${
          isInputNum ? 'Digit' : 'Character'
        } ${index + 1}`}
        autoComplete='off'
        style={{
          width: '1em',
          textAlign: 'center',
          ...(isStyleObject(inputStyle) && inputStyle),
          ...(focus && isStyleObject(focusStyle) && focusStyle),
          ...(isDisabled && isStyleObject(disabledStyle) && disabledStyle),
          ...(hasErrored && isStyleObject(errorStyle) && errorStyle),
        }}
        placeholder={placeholder}
        className={getClasses(
          inputStyle,
          focus && focusStyle,
          isDisabled && disabledStyle,
          hasErrored && errorStyle,
        )}
        type={getType()}
        maxLength='1'
        ref={inputRef}
        disabled={isDisabled}
        value={value || ''}
        {...rest}
      />
      {!isLastChild && separator}
    </div>
  )
}

const OtpInput = (props) => {
  const {
    numInputs,
    inputStyle,
    focusStyle,
    separator,
    isDisabled,
    disabledStyle,
    hasErrored,
    errorStyle,
    shouldAutoFocus,
    isInputNum,
    isInputSecure,
    className,
    containerStyle,
  } = props

  const getOtpValue = () => (props.value ? props.value.toString().split('') : [])

  const getPlaceholderValue = () => {
    const { placeholder, numInputs } = props

    if (typeof placeholder === 'string') {
      if (placeholder.length === numInputs) {
        return placeholder
      }
    }
  }

  const [activeInput, setActiveInput] = useState(0)
  const otp = getOtpValue()
  const placeholder = getPlaceholderValue()

  const handleOtpChange = (otp) => {
    const otpValue = otp.join('')

    props.onChange(otpValue)
  }

  const isInputValueValid = (value) => {
    const isTypeValid = props.isInputNum ? !isNaN(parseInt(value, 10)) : typeof value === 'string'

    return isTypeValid && value.trim().length === 1
  }

  const changeCodeAtFocus = (value) => {
    const otp = getOtpValue()
    otp[activeInput] = value[0]

    handleOtpChange(otp)
  }

  const handleOnChange = (e) => {
    const { value } = e.target

    if (isInputValueValid(value)) {
      changeCodeAtFocus(value)
    }
  }

  const focusInput = (input) => {
    const activeInput = Math.max(Math.min(numInputs - 1, input), 0)

    setActiveInput(activeInput)
  }

  const focusPrevInput = () => {
    focusInput(activeInput - 1)
  }

  const focusNextInput = () => {
    focusInput(activeInput + 1)
  }

  const handleOnKeyDown = (e) => {
    if (e.keyCode === BACKSPACE || e.key === 'Backspace') {
      e.preventDefault()
      changeCodeAtFocus('')
      focusPrevInput()
    } else if (e.keyCode === DELETE || e.key === 'Delete') {
      e.preventDefault()
      changeCodeAtFocus('')
    } else if (e.keyCode === LEFT_ARROW || e.key === 'ArrowLeft') {
      e.preventDefault()
      focusPrevInput()
    } else if (e.keyCode === RIGHT_ARROW || e.key === 'ArrowRight') {
      e.preventDefault()
      focusNextInput()
    } else if (
      e.keyCode === SPACEBAR ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault()
    }
  }

  const handleOnInput = (e) => {
    if (isInputValueValid(e.target.value)) {
      const otp = getOtpValue()
      if (otp.length < activeInput) {
        focusInput(otp.length + 1)
      } else {
        focusNextInput()
      }
    } else {
      // This is a workaround for dealing with keyCode "229 Unidentified" on Android.

      if (!props.isInputNum) {
        const { nativeEvent } = e

        if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
          e.preventDefault()
          changeCodeAtFocus('')
          focusPrevInput()
        }
      }
    }
  }

  const handleOnPaste = (e) => {
    e.preventDefault()

    if (isDisabled) {
      return
    }

    const otp = getOtpValue()
    let nextActiveInput = activeInput

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('')

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift()
        nextActiveInput++
      }
    }

    focusInput(nextActiveInput)
    handleOtpChange(otp)
  }

  useEffect(() => {
    if (otp.length === 0 && activeInput !== 0 && props.clearInput) {
      setActiveInput(0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '-12px',
        ...(isStyleObject(containerStyle) ? containerStyle : {}),
      }}
      className={!isStyleObject(containerStyle) ? containerStyle : ''}
    >
      {[...Array(numInputs).keys()].map((_, i) => (
        <SingleOtpInput
          placeholder={placeholder && placeholder[i]}
          key={i}
          index={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={handleOnChange}
          onKeyDown={handleOnKeyDown}
          onInput={handleOnInput}
          onPaste={handleOnPaste}
          onFocus={(e) => {
            setActiveInput(i)
            e.target.select()
          }}
          onBlur={() => setActiveInput(-1)}
          separator={separator}
          inputStyle={{
            borderRadius: 10,
            height: 56,
            width: 48,
            border: `1px solid #425862`,
            outline: 'none',
            fontSize: 32,
            fontWeight: 500,
            color: '#425862',
            backgroundColor: 'transparent',
            boxSizing: 'border-box',
            marginRight: '12px',
            ...inputStyle,
          }}
          focusStyle={
            !isDisabled
              ? {
                  // border: `1px solid blue`,
                  ...focusStyle,
                }
              : {}
          }
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={{
            border: `1px solid #425862`,
            ...errorStyle,
          }}
          shouldAutoFocus={shouldAutoFocus}
          isInputNum={isInputNum}
          isInputSecure={isInputSecure}
          className={className}
        />
      ))}
    </div>
  )
}

export default OtpInput
