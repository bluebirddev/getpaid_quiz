import { differenceInYears } from 'date-fns';
import { Question } from '../data/quiz';

export const questions: Question[] = [
  {
    key: 'first_name',
    label: 'What is your first name?',
    placeholder: 'First name',
    required: true,
    type: 'text',
  },
  {
    key: 'last_name',
    label: 'What is your surname?',
    placeholder: 'Surname',
    required: true,
    type: 'text',
  },
  {
    key: 'date_of_birth',
    label: 'What is your date of birth?',
    required: true,
    type: 'date',
    validate(date) {
      if (!date) return 'Please enter a valid date';
      const years = differenceInYears(new Date(), date);
      if (years < 18) return 'You must be 18 years or older to use this service';
    },
  },
  {
    key: 'tel',
    label: 'What is your cell phone number?',
    required: true,
    type: 'tel',
    placeholder: '074 685 4684',
    description:
      'You can only get paid if you answer a sales call on this number. Please ensure it is accurate.',
  },
  {
    key: 'gender',
    label: 'What is your gender?',
    required: true,
    type: 'select',
    options: [
      { value: 'male', label: 'Male' },
      { value: 'female', label: 'Female' },
      { value: 'other', label: 'Other' },
    ],
  },
  {
    key: 'sa_citizen',
    label: 'Are you a South African citizen or legal resident?',
    required: true,
    type: 'yes-no',
  },
  {
    key: 'products',
    label: 'What products would you be interested',
    required: true,
    type: 'multi-select',
    description: 'The more you select, the greater your opportunity to get paid.',
    options: [
      {
        value: 'funeral_cover',
        label: 'Funeral Cover',
      },
      {
        value: 'life_insurance',
        label: 'Life Insurance',
      },
      {
        value: 'hospital_insurance',
        label: 'Hospital Insurance',
      },
      {
        value: 'legal_aid',
        label: 'Legal Aid',
      },
      {
        value: 'vehicle_tracking',
        label: 'Vehicle Tracking',
      },
      {
        value: 'security',
        label: 'Security',
      },
      {
        value: 'debt_consolidation',
        label: 'Debt Consolidation',
      },
      {
        value: 'car_and_home_insurnace',
        label: 'Car and Home Insurnace',
      },
      {
        value: 'gap_cover',
        label: 'Gap Cover',
      },
      {
        value: 'personal_loan',
        label: 'Personal Loan',
      },
      {
        value: 'online_betting',
        label: 'Online Betting',
      },
    ],
  },
  {
    key: 'life_insurance_prompt',
    condition(answers) {
      const product = answers['products'];
      if (!product) return true;
      return !product.includes('life_insurance');
    },
    label:
      "Can we call you about Life Insurance offers? (You'll get paid if you get a quote, of course)",
    required: true,
    description: "You'll get paid if you get a quote, of course.",
    type: 'yes-no',
  },
  {
    key: 'email',
    label: 'Do you have an email address?',
    description: 'If you have an email address, enter it below, otherwise you can skip this step.',
    type: 'email',
    placeholder: 'Email address',
  },
  {
    key: 'province',
    label: 'What province do you live in?',
    required: true,
    type: 'select',
    options: [
      {
        value: 'eastern_cape',
        label: 'Eastern Cape',
      },
      {
        value: 'free_state',
        label: 'Free State',
      },
      {
        value: 'gauteng',
        label: 'Gauteng',
      },
      {
        value: 'kwazulu_natal',
        label: 'KwaZulu Natal',
      },
      {
        value: 'limpopo',
        label: 'Limpopo',
      },
      {
        value: 'mpumalanga',
        label: 'Mpumalanga',
      },
      {
        value: 'northern_cape',
        label: 'Northern Cape',
      },
      {
        value: 'north_west',
        label: 'North West',
      },
      {
        value: 'western_cape',
        label: 'Western Cape',
      },
    ],
  },
  {
    key: 'marital_status',
    label: 'What is your marital status?',
    required: true,
    type: 'select',
    options: [
      {
        value: 'never_married',
        label: 'Never Married',
      },
      {
        value: 'married',
        label: 'Married',
      },
      {
        value: 'divorced',
        label: 'Divorced',
      },
      {
        value: 'widowed',
        label: 'Widowed',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },
  {
    key: 'dependants',
    label: 'Do you have any financial dependants?',
    required: true,
    description: 'Choose as many as you like.',
    type: 'multi-select',
    options: [
      {
        value: 'no',
        label: 'No',
      },
      {
        value: 'my_parents',
        label: 'My Parents',
      },
      {
        value: 'my_spouse_or_partner',
        label: 'My Spouse or Partner',
      },
      {
        value: 'my_children',
        label: 'My Children',
      },
      {
        value: 'my_extended_famil',
        label: 'My Extended Famil',
      },
    ],
  },
  {
    key: 'education',
    label: 'What is your highest level of education?',
    required: true,
    type: 'select',
    options: [
      {
        value: 'some_schooling',
        label: 'Some schooling',
      },
      {
        value: 'matric',
        label: 'Matric',
      },
      {
        value: 'diploma_or_3-year_degree',
        label: 'Diploma or 3-year Degree',
      },
      {
        value: '4-year_degree',
        label: '4-year Degree',
      },
      {
        value: 'post_grad_qualification',
        label: 'Post grad qualification',
      },
    ],
  },
  {
    key: 'employment_status',
    label: 'What is your current employment status?',
    required: true,
    type: 'select',
    options: [
      {
        value: 'unemployed',
        label: 'Unemployed',
      },
      {
        value: 'part-time_employee',
        label: 'Part-time employee',
      },
      {
        value: 'full-time_employee',
        label: 'Full-time employee',
      },
      {
        value: 'self-employed/own_business',
        label: 'Self-employed/Own Business',
      },
    ],
  },
  {
    key: 'employment_sector',
    label: 'What Sector do you work in?',
    condition(answers) {
      const employmentStatus = answers['employment_status'];
      return !employmentStatus || employmentStatus !== 'unemployed';
    },
    required: true,
    type: 'select',
    options: [
      {
        value: 'aerospace_and_aviation',
        label: 'Aerospace and Aviation',
      },
      {
        value: 'agriculture',
        label: 'Agriculture',
      },
      {
        value: 'automotive',
        label: 'Automotive',
      },
      {
        value: 'arts,_entertainment,_and_recreation',
        label: 'Arts, Entertainment, and Recreation',
      },
      {
        value: 'banking_and_financial_services',
        label: 'Banking and financial services',
      },
      {
        value: 'construction_and_building',
        label: 'Construction and building',
      },
      {
        value: 'education',
        label: 'Education',
      },
      {
        value: 'engineering',
        label: 'Engineering',
      },
      {
        value: 'government_(e.g._police,_fire,_medical)',
        label: 'Government (e.g. Police, Fire, Medical)',
      },
      {
        value: 'information_technology_&_telecommunication',
        label: 'Information Technology & Telecommunication',
      },
      {
        value: 'manufacturing',
        label: 'Manufacturing',
      },
      {
        value: 'marketing',
        label: 'Marketing',
      },
      {
        value: 'mining',
        label: 'Mining',
      },
      {
        value: 'safety_&_security',
        label: 'Safety & Security',
      },
      {
        value: 'travel_&_hospitality',
        label: 'Travel & Hospitality',
      },
      {
        value: 'real_estate',
        label: 'Real Estate',
      },
      {
        value: 'retail',
        label: 'Retail',
      },
      {
        value: 'transportation_&_logistics',
        label: 'Transportation & Logistics',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },
  {
    key: 'monthly_income',
    label: 'How much do you earn every month?',
    description: '(Before taxes or deductions)',
    condition(answers) {
      const employmentStatus = answers['employment_status'];
      return !employmentStatus || employmentStatus !== 'unemployed';
    },
    required: true,
    type: 'select',
    options: [
      {
        value: 'less_than_r1000',
        label: 'Less than R1,000',
      },
      {
        value: 'r1000_to_r4999',
        label: 'R1,000 to R4,999',
      },
      {
        value: 'r5000_to_r9999',
        label: 'R5,000 to R9,999',
      },
      {
        value: 'r10000_to_r14999',
        label: 'R10,000 to R14,999',
      },
      {
        value: 'r15000_to_r24999',
        label: 'R15,000 to R24,999',
      },
      {
        value: 'r25000_or_more',
        label: 'R25,000 or more',
      },
    ],
  },
  {
    key: 'why_unemployed',
    label: 'Please select the most accurate description of your unemployment?',
    description: '(Before taxes or deductions)',
    required: true,
    condition(answers) {
      const employmentStatus = answers['employment_status'];
      return employmentStatus === 'unemployed';
    },
    type: 'select',
    options: [
      {
        value: 'i_am_a_student_and_still_studying',
        label: 'I am a student and still studying',
      },
      {
        value: 'i_am_unemployed_but_looking_for_a_job',
        label: 'I am unemployed but looking for a job',
      },
      {
        value: 'i_am_a_stay-at-home_parent',
        label: 'I am a stay-at-home parent',
      },
      {
        value: 'i_am_unable_to_work',
        label: 'I am unable to work',
      },
      {
        value: 'i_am_retired',
        label: 'I am retired',
      },
      {
        value: 'i_am_unemployed_but_not_looking_for_a_job',
        label: 'I am unemployed but not looking for a job',
      },
    ],
  },
  {
    key: 'household_income',
    label: 'What is your household income?',
    description: '(Before taxes or deductions)',
    required: true,
    type: 'select',
    condition(answers) {
      const employmentStatus = answers['employment_status'];
      return employmentStatus === 'unemployed';
    },
    options: [
      {
        value: 'less_than_r1000',
        label: 'Less than R1,000',
      },
      {
        value: 'r1000_to_r4999',
        label: 'R1,000 to R4,999',
      },
      {
        value: 'r5000_to_r9999',
        label: 'R5,000 to R9,999',
      },
      {
        value: 'r10000_to_r14999',
        label: 'R10,000 to R14,999',
      },
      {
        value: 'r15000_to_r24999',
        label: 'R15,000 to R24,999',
      },
      {
        value: 'r25000_or_more',
        label: 'R25,000 or more',
      },
    ],
  },
  {
    key: 'financial_products',
    label: 'What financial products do you already have?',
    required: true,
    type: 'multi-select',
    options: [
      {
        value: 'bank_account',
        label: 'Bank Account',
      },
      {
        value: 'life_insurance',
        label: 'Life Insurance',
      },
      {
        value: 'car_or_home_insurance',
        label: 'Car or Home Insurance',
      },
      {
        value: 'funeral_cover',
        label: 'Funeral Cover',
      },
      {
        value: 'medical_aid',
        label: 'Medical Aid',
      },
      {
        value: 'hospital_cover',
        label: 'Hospital Cover',
      },
      {
        value: 'legal_cover',
        label: 'Legal Cover',
      },
    ],
  },
  {
    key: 'transportation',
    label: 'What do you normally use for transport?',
    required: true,
    type: 'select',
    options: [
      {
        value: 'public_transport',
        label: 'Public Transport',
      },
      {
        value: 'own_vehicle',
        label: 'Own Vehicle',
      },
      {
        value: 'ride_share_(e.g._uber)',
        label: 'Ride Share (e.g. Uber)',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },
  {
    key: 'groceries',
    label: 'Where do you usually buy your groceries?',
    required: true,
    type: 'select',
    options: [
      {
        value: 'shoprite',
        label: 'Shoprite',
      },
      {
        value: 'checkers',
        label: 'Checkers',
      },
      {
        value: "pick_'n_pay",
        label: "Pick 'n Pay",
      },
      {
        value: 'woolworths',
        label: 'Woolworths',
      },
      {
        value: 'spar',
        label: 'Spar',
      },
      {
        value: 'boxer',
        label: 'Boxer',
      },
      {
        value: 'other',
        label: 'Other',
      },
    ],
  },
  {
    key: 'home_internet',
    label: 'What do you mostly use to access the internet when at home?',
    required: true,
    type: 'select',
    options: [
      {
        value: 'fibre_or_adsl_to_the_home',
        label: 'Fibre or ADSL to the home',
      },
      {
        value: 'mobile_data',
        label: 'Mobile Data',
      },
    ],
  },
  {
    key: 'twitter_handle',
    label: 'What is your Twitter handle?',
    type: 'text',
    validate: (value) => {
      if (!value) return undefined;
      function validTwitteUser(sn: string) {
        return /^[a-zA-Z0-9_]{1,15}$/.test(sn);
      }
      return validTwitteUser(value) ? undefined : 'Please enter a valid Twitter handle';
    },
  },
  {
    key: 'time_call',
    label: 'What is the best time of day to try to call you?',
    required: true,
    type: 'select',
    options: [
      {
        value: '8am_to_10am',
        label: '8am to 10am',
      },
      {
        value: '10am_to_12pm',
        label: '10am to 12pm',
      },
      {
        value: '12pm_to_3pm',
        label: '12pm to 3pm',
      },
      {
        value: '3pm_to_5pm',
        label: '3pm to 5pm',
      },
      {
        value: 'after_5pm',
        label: 'After 5pm',
      },
    ],
  },
  {
    key: 'have_referral_code',
    label: 'Do you have a referral code?',
    type: 'yes-no',
    required: true,
  },
  {
    key: 'referral_code',
    label: 'If you have a referral code, enter it here',
    type: 'text',
    condition(answers) {
      return !!answers.have_referral_code;
    },
    required: true,
  },
  {
    key: 'personal_info_consent',
    label: 'Consent',
    description: (
      <>
        I provide consent to have my personal information collected, processed, and possibly shared
        with third parties who may contact me based on my profile with the hope to make a sale. The
        sharing of this information with third parties will allow me to earn a financial reward.
        <br />
        <br />
        For full details of the privacy, processing and data policy to which you consent,{' '}
        <a href="https://get-paid.co.za/privacy-cookie-policy/" target="_blank" rel="noreferrer">
          see here
        </a>
        .
      </>
    ),
    type: 'agree-disagree',
    validate: (value) => (!value ? 'You must agree to the terms to continue' : undefined),
    required: true,
    agreeText: 'I agree',
    disagreeText: 'I disagree',
  },
  {
    key: 'marketing_consent',
    label: 'No obligation',
    description: (
      <>
        I understand that I am under no obligation to buy any product, or take up any service when
        I’m contacted by a third-party marketer
      </>
    ),
    type: 'agree-disagree',
    validate: (value) => (!value ? 'You must agree to the terms to continue' : undefined),
    required: true,
    agreeText: 'Yes, I understand and agree',
    disagreeText: 'No, I don’t understand and disagree',
  },
  {
    key: 'anything_else',
    label: 'Anything else you would like us to know?',
    type: 'text',
  },
];
