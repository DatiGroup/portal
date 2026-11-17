const navigateMock = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const mod: any = await importOriginal();
  return {
    ...mod,
    useNavigate: () => navigateMock
  };
});

vi.mock('@iconify/react/dist/iconify.js', async (importOriginal) => {
  const mod: any = await importOriginal();
  return {
    ...mod,
    Icon: () => []
  };
});

import { fireEvent, render, screen, waitFor } from 'tests/testUtils/renderWithContext';
import RegisterForm from 'sections/auth/RegisterForm';
import { strengthColor, strengthIndicator as strengthEvaluator } from 'utils/passwordStrength';
import { Theme, useTheme } from '@mui/material/styles';
import { getNestedProperty } from 'utils/objectDesctructure';
import * as registerFetches from 'sections/auth/fetch/registerFetches';
import { RequestStatusEnum } from 'store/type/CrudReponseType';
import { vi } from 'vitest';

// Helper component to grab the theme
function ThemeGrabber({ onTheme }: { onTheme: (theme: Theme) => void }) {
  const theme = useTheme();
  onTheme(theme);
  return null;
}

describe('Registration component is working', () => {
  it('renders form, inputs and various elements', () => {
    render(<RegisterForm />);

    const formElement: HTMLFormElement = screen.getByRole('form', { name: 'registrationForm' });
    const userNameInput: HTMLInputElement = screen.getByLabelText('Username');
    const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
    const repeatPasswordInput: HTMLInputElement = screen.getByLabelText('Repeat Password');
    const strengthIndicator: HTMLElement = screen.getByRole('generic', { name: 'strengthIndicator' });
    const strengthText: HTMLElement = screen.getByRole('heading', { name: 'strengthText' });
    const emailInput: HTMLInputElement = screen.getByLabelText('Email');
    const firstNameInput: HTMLInputElement = screen.getByLabelText('First Name');
    const lastNameInput: HTMLInputElement = screen.getByLabelText('Last Name');
    const prefLangInput: HTMLInputElement = screen.getByLabelText('Preferred Language');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });

    expect(formElement).toBeInTheDocument();
    expect(userNameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(repeatPasswordInput).toBeInTheDocument();
    expect(strengthIndicator).toBeInTheDocument();
    expect(strengthText).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(prefLangInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('validates username', async () => {
    render(<RegisterForm />);

    const userNameInput: HTMLInputElement = screen.getByLabelText('Username');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });

    // min length check
    fireEvent.change(userNameInput!, { target: { value: 'x' } });
    fireEvent.blur(userNameInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Minimum 5');

    // max length check
    fireEvent.change(userNameInput!, { target: { value: 'x'.repeat(256) } });
    fireEvent.blur(userNameInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Maximum 255');

    // letters check
    fireEvent.change(userNameInput!, { target: { value: `${'x'.repeat(4)}!` } });
    fireEvent.blur(userNameInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Username can only contain letters, numbers, and ._@+- characters');

    // dot series check
    fireEvent.change(userNameInput!, { target: { value: 'xx..x' } });
    fireEvent.blur(userNameInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Username cannot contain consecutive dots');

    // dot edges check
    fireEvent.change(userNameInput!, { target: { value: '.xxx.' } });
    fireEvent.blur(userNameInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Username cannot start or end with a dot');
  });

  it('validates password and repeat password', async () => {
    render(<RegisterForm />);

    const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
    const repeatPasswordInput: HTMLInputElement = screen.getByLabelText('Repeat Password');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });

    // min length check
    fireEvent.change(passwordInput!, { target: { value: 'x' } });
    fireEvent.blur(passwordInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Minimum 8');

    // max length check
    fireEvent.change(passwordInput!, { target: { value: 'x'.repeat(65) } });
    fireEvent.blur(passwordInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Maximum 64');

    // lowercase check
    fireEvent.change(passwordInput!, { target: { value: 'XXXXXXXX' } });
    fireEvent.blur(passwordInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Password must contain at least one lowercase letter');

    // uppercase check
    fireEvent.change(passwordInput!, { target: { value: 'xxxxxxxx' } });
    fireEvent.blur(passwordInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Password must contain at least one uppercase letter');

    // digit check
    fireEvent.change(passwordInput!, { target: { value: 'XXXXxxxx' } });
    fireEvent.blur(passwordInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Password must contain at least one digit');

    // special char check
    fireEvent.change(passwordInput!, { target: { value: 'XXXXxxx1' } });
    fireEvent.blur(passwordInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Password must contain at least one special character');

    // passwords match check
    fireEvent.change(passwordInput!, { target: { value: 'XXx1!xxx' } });
    fireEvent.change(repeatPasswordInput!, { target: { value: 'XXx1!xxxZ' } });
    fireEvent.blur(repeatPasswordInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Passwords do not match');
  });

  it('validates email', async () => {
    render(<RegisterForm />);

    const emailInput: HTMLInputElement = screen.getByLabelText('Email');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });

    // invalid email format check
    fireEvent.change(emailInput!, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Wrong email format');

    // max length check
    fireEvent.change(emailInput!, { target: { value: 'x'.repeat(101) + '@example.com' } });
    fireEvent.blur(emailInput!);
    fireEvent.click(submitButton!);

    await screen.findByText('Maximum 100');
  });

  it('validates first name', async () => {
    render(<RegisterForm />);

    const firstNameInput: HTMLInputElement = screen.getByLabelText('First Name');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });
    const firstNameHelper: HTMLElement = screen.getByTestId('firstName-helperText');

    // non empty check
    fireEvent.change(firstNameInput!, { target: { value: '' } });
    fireEvent.blur(firstNameInput!);
    fireEvent.click(submitButton!);

    await waitFor(() => {
      expect(firstNameHelper).toHaveTextContent('Required');
    });

    // max length check
    fireEvent.change(firstNameInput!, { target: { value: 'x'.repeat(51) } });
    fireEvent.blur(firstNameInput!);
    fireEvent.click(submitButton!);

    await waitFor(() => {
      expect(firstNameHelper).toHaveTextContent('Maximum 50');
    });
  });

  it('validates last name', async () => {
    render(<RegisterForm />);

    const lastNameInput: HTMLInputElement = screen.getByLabelText('Last Name');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });
    const lastNameHelper: HTMLElement = screen.getByTestId('lastName-helperText');

    // non empty check
    fireEvent.change(lastNameInput!, { target: { value: '' } });
    fireEvent.blur(lastNameInput!);
    fireEvent.click(submitButton!);

    await waitFor(() => {
      expect(lastNameHelper).toHaveTextContent('Required');
    });

    // max length check
    fireEvent.change(lastNameInput!, { target: { value: 'x'.repeat(51) } });
    fireEvent.blur(lastNameInput!);
    fireEvent.click(submitButton!);

    await waitFor(() => {
      expect(lastNameHelper).toHaveTextContent('Maximum 50');
    });
  });

  it('validates preferred language', async () => {
    render(<RegisterForm />);

    const prefLangInput: HTMLInputElement = screen.getByLabelText('Preferred Language');
    const prefLangDiv: HTMLElement = screen.getByText('Select Language');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });
    const selectHelper: HTMLSelectElement = screen.getByTestId('preferredLang-helperSelect');

    // non empty check
    fireEvent.change(prefLangInput!, { target: { value: '' } });
    fireEvent.blur(prefLangDiv!);
    fireEvent.click(submitButton!);

    await waitFor(() => {
      expect(selectHelper).toHaveTextContent('Required');
    });

    // // max length check
    // fireEvent.change(prefLangInput!, { target: { value: 'x'.repeat(51) } });
    // fireEvent.blur(prefLangDiv!);
    // fireEvent.click(submitButton!);

    // await waitFor(() => {
    //   expect(selectHelper).toHaveTextContent('Maximum 50');
    // });
  });

  it('has a working password strength indicator', async () => {
    let themeInstance: Theme;
    render(
      <>
        <ThemeGrabber onTheme={(t) => (themeInstance = t)} />
        <RegisterForm />
      </>
    );

    const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
    const strengthIndicator: HTMLElement = screen.getByRole('generic', { name: 'strengthIndicator' });
    const strengthText: HTMLElement = screen.getByRole('heading', { name: 'strengthText' });

    // poor check
    fireEvent.change(passwordInput!, { target: { value: 'x' } });
    fireEvent.blur(passwordInput!);

    await waitFor(() => {
      const getEvaluatedColor = strengthColor(strengthEvaluator(passwordInput!.value))?.color;
      const getActualColor = getNestedProperty(themeInstance!.palette, getEvaluatedColor!);

      expect(strengthIndicator).toHaveStyle(`background-color: ${getActualColor}`);
      expect(strengthText).toHaveTextContent('Poor');
    });

    // weak check
    fireEvent.change(passwordInput!, { target: { value: 'x'.repeat(8) } });
    fireEvent.blur(passwordInput!);

    await waitFor(() => {
      const getEvaluatedColor = strengthColor(strengthEvaluator(passwordInput!.value))?.color;
      const getActualColor = getNestedProperty(themeInstance!.palette, getEvaluatedColor!);

      expect(strengthIndicator).toHaveStyle(`background-color: ${getActualColor}`);
      expect(strengthText).toHaveTextContent('Weak');
    });

    // normal check
    fireEvent.change(passwordInput!, { target: { value: 'x'.repeat(8) + '1' } });
    fireEvent.blur(passwordInput!);

    await waitFor(() => {
      const getEvaluatedColor = strengthColor(strengthEvaluator(passwordInput!.value))?.color;
      const getActualColor = getNestedProperty(themeInstance!.palette, getEvaluatedColor!);

      expect(strengthIndicator).toHaveStyle(`background-color: ${getActualColor}`);
      expect(strengthText).toHaveTextContent('Normal');
    });

    // good check
    fireEvent.change(passwordInput!, { target: { value: 'x'.repeat(8) + '1!' } });
    fireEvent.blur(passwordInput!);

    await waitFor(() => {
      const getEvaluatedColor = strengthColor(strengthEvaluator(passwordInput!.value))?.color;
      const getActualColor = getNestedProperty(themeInstance!.palette, getEvaluatedColor!);

      expect(strengthIndicator).toHaveStyle(`background-color: ${getActualColor}`);
      expect(strengthText).toHaveTextContent('Good');
    });

    // strong check
    fireEvent.change(passwordInput!, { target: { value: 'x'.repeat(8) + '1!X' } });
    fireEvent.blur(passwordInput!);

    await waitFor(() => {
      const getEvaluatedColor = strengthColor(strengthEvaluator(passwordInput!.value))?.color;
      const getActualColor = getNestedProperty(themeInstance!.palette, getEvaluatedColor!);

      expect(strengthIndicator).toHaveStyle(`background-color: ${getActualColor}`);
      expect(strengthText).toHaveTextContent('Strong');
    });
  });

  it('submits the form with the right inputs and receives 200 response', async () => {
    const handleRegisterFetchSpy = vi
      .spyOn(registerFetches, 'handleRegisterFetch')
      .mockImplementation(() => Promise.resolve({ message: RequestStatusEnum.SUCCESS, status: 200 }));

    render(<RegisterForm />);

    const userNameInput: HTMLInputElement = screen.getByLabelText('Username');
    const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
    const repeatPasswordInput: HTMLInputElement = screen.getByLabelText('Repeat Password');
    const emailInput: HTMLInputElement = screen.getByLabelText('Email');
    const firstNameInput: HTMLInputElement = screen.getByLabelText('First Name');
    const lastNameInput: HTMLInputElement = screen.getByLabelText('Last Name');
    const prefLangInput: HTMLInputElement = screen.getByLabelText('Preferred Language');
    const prefLangDiv: HTMLElement = screen.getByText('Select Language');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });

    fireEvent.change(userNameInput!, { target: { value: 'FutureIntent' } });
    fireEvent.blur(userNameInput!);

    fireEvent.change(passwordInput!, { target: { value: 'Xx1!xxxx' } });
    fireEvent.blur(passwordInput!);

    fireEvent.change(repeatPasswordInput!, { target: { value: 'Xx1!xxxx' } });
    fireEvent.blur(repeatPasswordInput!);

    fireEvent.change(emailInput!, { target: { value: 'IamSoulfuller@example.com' } });
    fireEvent.blur(emailInput!);

    fireEvent.change(firstNameInput!, { target: { value: 'Future' } });
    fireEvent.blur(firstNameInput!);

    fireEvent.change(lastNameInput!, { target: { value: 'Intent' } });
    fireEvent.blur(lastNameInput!);

    fireEvent.change(prefLangInput!, { target: { value: 'en' } });
    fireEvent.blur(prefLangDiv!);

    fireEvent.click(submitButton!);

    await waitFor(() => {
      expect(handleRegisterFetchSpy).toHaveBeenCalled();
      expect(navigateMock).toHaveBeenCalled();
    });
  });

  it('submits the form with the right inputs and receives 400 response', async () => {
    const handleRegisterFetchSpy = vi
      .spyOn(registerFetches, 'handleRegisterFetch')
      .mockImplementation(() => Promise.reject({ message: RequestStatusEnum.ERROR, status: 400 }));

    render(<RegisterForm />);

    const userNameInput: HTMLInputElement = screen.getByLabelText('Username');
    const passwordInput: HTMLInputElement = screen.getByLabelText('Password');
    const repeatPasswordInput: HTMLInputElement = screen.getByLabelText('Repeat Password');
    const emailInput: HTMLInputElement = screen.getByLabelText('Email');
    const firstNameInput: HTMLInputElement = screen.getByLabelText('First Name');
    const lastNameInput: HTMLInputElement = screen.getByLabelText('Last Name');
    const prefLangInput: HTMLInputElement = screen.getByLabelText('Preferred Language');
    const prefLangDiv: HTMLElement = screen.getByText('Select Language');
    const submitButton: HTMLButtonElement = screen.getByRole('button', { name: 'submitButton' });

    fireEvent.change(userNameInput!, { target: { value: 'FutureIntent' } });
    fireEvent.blur(userNameInput!);

    fireEvent.change(passwordInput!, { target: { value: 'Xx1!xxxx' } });
    fireEvent.blur(passwordInput!);

    fireEvent.change(repeatPasswordInput!, { target: { value: 'Xx1!xxxx' } });
    fireEvent.blur(repeatPasswordInput!);

    fireEvent.change(emailInput!, { target: { value: 'IamSoulfuller@example.com' } });
    fireEvent.blur(emailInput!);

    fireEvent.change(firstNameInput!, { target: { value: 'Future' } });
    fireEvent.blur(firstNameInput!);

    fireEvent.change(lastNameInput!, { target: { value: 'Intent' } });
    fireEvent.blur(lastNameInput!);

    fireEvent.change(prefLangInput!, { target: { value: 'en' } });
    fireEvent.blur(prefLangDiv!);

    fireEvent.click(submitButton!);

    await waitFor(async () => {
      expect(handleRegisterFetchSpy).toHaveBeenCalled();

      const errorMessage = await screen.findByText('Registration failed');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
