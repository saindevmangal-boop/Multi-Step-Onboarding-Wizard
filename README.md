# Multi-Step Onboarding Wizard

A production-ready React onboarding wizard demonstrating advanced form management, state lifting, real-time validation, and schema-driven validation.

## 🎯 Features

### Phase 1: MVP (Complete)
- ✅ **3-Step Form Wizard**: Personal Info → Account Details → Review & Submit
- ✅ **State Lifting**: Parent component manages unified form state
- ✅ **Data Persistence**: Navigate backward without losing data
- ✅ **Progress Indicator**: Dynamic progress bar showing current step
- ✅ **Submission Payload**: Logs complete form data to console on submit

### Phase 2: Priority 1 Features (Complete)
- ✅ **Real-Time Validation**: Regex-based validation on every keystroke
- ✅ **Conditional Button Disabling**: "Next" button disabled until step validates
- ✅ **Show/Hide Password Toggle**: Dynamic password visibility toggle
- ✅ **Live Validation Feedback**: ✓/✗ indicators for each field
- ✅ **Field-Level Error Display**: Contextual error messages

### Phase 3: Production Features (Complete)
- ✅ **React Hook Form Integration**: Advanced form state management
- ✅ **Zod Schema Validation**: Type-safe, composable validation schemas
- ✅ **Cross-Field Validation**: Password confirmation matching
- ✅ **Step-Scoped Schemas**: Separate validation for each wizard step

## 📦 Project Structure

```
src/
├── components/
│   ├── OnboardingWizard.jsx      # Parent component (state management)
│   ├── PersonalInfo.jsx          # Step 1 form
│   ├── AccountDetails.jsx        # Step 2 form
│   ├── ReviewSubmit.jsx          # Step 3 review & checkboxes
│   └── ProgressBar.jsx           # Progress indicator
├── schemas/
│   └── validationSchema.js       # Zod schemas for all steps
├── styles/
│   └── index.css                 # Complete styling
├── App.jsx                       # Root app component
└── main.jsx                      # Vite entry point
```

## 🚀 Getting Started

### Installation

```bash
# Navigate to project directory
cd prodeskit

# Install dependencies
npm install
```

### Development Server

```bash
# Start Vite dev server
npm run dev
```

The wizard will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔍 Key Implementation Details

### State Management Architecture

The form state is **lifted to the parent component** (`OnboardingWizard.jsx`), ensuring:
- Single source of truth for all form data
- Data persistence when navigating between steps
- Atomic updates to form state
- Controlled component pattern

```javascript
// Parent state structure
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  jobTitle: '',
  username: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
  subscribeNewsletter: false,
});
```

### Validation System

**Real-Time Validation** with Zod schemas:

```javascript
// Field validation on change
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  
  // Validate immediately
  const error = validateField(name, value);
  setErrors(prev => ({ ...prev, [name]: error }));
};
```

**Zod Schemas** (in `src/schemas/validationSchema.js`):
- Email must contain `@` symbol
- Phone must be 10+ digits
- Password requires: 8+ chars, uppercase, lowercase, number, special character
- Username: 3+ chars, alphanumeric + underscore/hyphen
- Cross-field validation: password === confirmPassword

### Form Step Validation

Each step has a **scoped validation schema**:
- **Step 1**: `personalInfoSchema` (firstName, lastName, email, phone)
- **Step 2**: `accountDetailsSchema` (company, jobTitle, username, password, confirmPassword)
- **Step 3**: `reviewSchema` (agreeToTerms, subscribeNewsletter)

The "Next" button is **disabled until validation passes**:

```javascript
const isFormValid = () => {
  try {
    personalInfoSchema.parse(formData);
    return true;
  } catch {
    return false;
  }
};

<button disabled={!isFormValid()}>Next →</button>
```

### Password Management

**Show/Hide Toggle** dynamically changes input type:

```javascript
const [showPassword, setShowPassword] = useState(false);

<input type={showPassword ? 'text' : 'password'} />
<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? '👁️' : '👁️‍🗨️'}
</button>
```

### Submission Flow

1. User completes all 3 steps
2. Clicks "Submit" on Review screen
3. Form validates against complete schema
4. Data logged to console with timestamp
5. Success screen displayed with user confirmation
6. User can create another account (resets form)

**Console Output on Submit:**
```
===== ONBOARDING SUBMISSION =====
Timestamp: 2024-01-15T10:30:45.123Z
Complete Form Payload: {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  company: "Acme Corp",
  jobTitle: "Product Manager",
  username: "john_doe",
  password: "Secure@123",
  confirmPassword: "Secure@123",
  agreeToTerms: true,
  subscribeNewsletter: true
}
=====================================
```

## 🎨 UI/UX Features

- **Responsive Design**: Fully responsive on mobile, tablet, desktop
- **Visual Feedback**: Real-time validation indicators (✓/✗)
- **Progress Tracking**: Step counter and visual progress bar
- **Gradient Design**: Professional gradient backgrounds
- **Loading State**: Submission loader overlay
- **Success Animation**: Slide-down animation on success screen
- **Accessibility**: Proper label associations, semantic HTML

## 🔐 Validation Rules

| Field | Rules |
|-------|-------|
| First Name | 2+ chars, letters/spaces/hyphens/apostrophes only |
| Last Name | 2+ chars, letters/spaces/hyphens/apostrophes only |
| Email | Valid email format with @ symbol |
| Phone | 10+ digit number with optional formatting |
| Company | 2+ characters |
| Job Title | 2+ characters |
| Username | 3+ chars, alphanumeric + underscore/hyphen |
| Password | 8+ chars, uppercase, lowercase, number, special char |
| Confirm Password | Must match password field |
| Terms | Must be checked |

## 📊 Data Flow Diagram

```
OnboardingWizard (Parent - State Holder)
├── ProgressBar
│   └── currentStep, totalSteps
├── PersonalInfo (Step 1)
│   ├── reads: formData
│   ├── writes: setFormData
│   └── manages: personal info validation
├── AccountDetails (Step 2)
│   ├── reads: formData
│   ├── writes: setFormData
│   └── manages: account & password validation
└── ReviewSubmit (Step 3)
    ├── reads: formData
    ├── writes: setFormData
    └── manages: terms & newsletter
```

## 🛠️ Technology Stack

- **React 18.3**: UI library
- **Vite**: Build tool & dev server
- **Zod**: Schema validation
- **CSS3**: Styling with gradients, animations, flexbox
- **ES6+**: Modern JavaScript

## 🧪 Testing the Wizard

### Test Scenarios

1. **Happy Path**: Complete form → Submit → Success
2. **Backward Navigation**: Go back → Data persists → Go forward
3. **Field Validation**: Try invalid inputs → See error messages
4. **Button States**: Buttons disabled until validation passes
5. **Password Toggle**: Show/hide password functionality
6. **Cross-Field Validation**: Password mismatch error

### Example Test Data

```
First Name: John
Last Name: Doe
Email: john.doe@example.com
Phone: +1 (555) 123-4567
Company: Acme Corporation
Job Title: Senior Product Manager
Username: john_doe_123
Password: SecureP@ssw0rd
Confirm Password: SecureP@ssw0rd
```

## 📝 Notes

- All form data is preserved in component state during wizard navigation
- Validation runs in real-time as user types
- Submit button is conditionally disabled based on schema validation
- Console logs the complete payload on successful submission
- Success screen allows users to create another account (resets form)

## 🚀 Future Enhancements

- API integration for form submission
- Database persistence for user accounts
- Email verification step
- OAuth/SSO integration
- Multi-language support
- Accessibility audit (WCAG compliance)
- Unit/integration tests

## 📄 License

This project is open source and available under the MIT License.
