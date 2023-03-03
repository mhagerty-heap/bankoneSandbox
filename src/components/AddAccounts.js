import React, { useRef, useState } from 'react';
import Link from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { RadioButton } from 'primereact/radiobutton';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { ListBox } from 'primereact/listbox';
import { Dialog } from 'primereact/dialog';
import SelectAccountType from "./addAccountForm/1SelectAccountType";
import JointOrIndividual from "./addAccountForm/2JointOrIndividual";
import ContactInformation from "./addAccountForm/3ContactInformation";
import EmploymentDetails from "./addAccountForm/4EmploymentDetails";
import BankInvestmentProfile from "./addAccountForm/5BankInvestmentProfile";
import RegulatoryQuestions from "./addAccountForm/6RegulatoryQuestions";
import Disclosures from "./addAccountForm/7Disclosures";
import SubmitAddAccount from "./addAccountForm/8SubmitAddAccount";
import axios from 'axios';


const AddAccounts = () => {
  const accountTypes = ['Savings', 'Checking'];
  const [accountType, setAccountType] = useState('Savings');
  const [showchecking, setShowChecking] = useState(false)
  const [showSavings, setShowSavings] = useState(true)
  const [showBillPay, setShowBillPay] = useState(false)
  const depositSuccessMessage = useRef(null);
  const depositFailMessage = useRef(null);
  const [savingsAccountIndOrJoint, setSavingsAccountIndOrJoint] = useState('Individual');
  const [savingsWithholding, setSavingsWithholding] = useState('No');
  const [savingsFirstName, setSavingsFirstName] = useState('')
  const [savingsLastName, setSavingsLastName] = useState('')
  const [savingsMiddleInitial, setSavingsMiddleInitial] = useState('')
  const [savingsPhoneNumber, setSavingsPhoneNumber] = useState('')
  const [savingsEmailAddress, setSavingsEmailAddress] = useState('')
  const [savingsOccupation, setSavingsOccupation] = useState('')
  const [savingsSelectAnnualIncome, setSavingsSelectAnnualIncome] = useState(null)
  const [savingsSelectNetWorth, setSavingsSelectNetWorth] = useState(null)
  const [savingsSourceOfNetWorth, setSavingsSourceOfNetWorth] = useState(null)
  const [savingsExpectedUseOfAccount, setSavingsExpectedUseOfAccount] = useState(null)
  const [savingsAccountUsageFrequency, setSavingsAccountUsageFrequency] = useState(null)
  const [savingsAccountDisclosure, setSavingsAccountDisclosure] = useState('Yes');
  const savingsAccountSuccessMessage = useRef(null);
  const savingsAccountFailMessage = useRef(null);

  const [checkingAccountIndOrJoint, setCheckingAccountIndOrJoint] = useState('Individual');
  const [checkingWithholding, setCheckingWithholding] = useState('No');
  const [checkingFirstName, setCheckingFirstName] = useState('')
  const [checkingLastName, setCheckingLastName] = useState('')
  const [checkingMiddleInitial, setCheckingMiddleInitial] = useState('')
  const [checkingPhoneNumber, setCheckingPhoneNumber] = useState('')
  const [checkingEmailAddress, setCheckingEmailAddress] = useState('')
  const [checkingOccupation, setCheckingOccupation] = useState('')
  const [checkingSelectAnnualIncome, setCheckingSelectAnnualIncome] = useState(null)
  const [checkingSelectNetWorth, setCheckingSelectNetWorth] = useState(null)
  const [checkingSourceOfNetWorth, setCheckingSourceOfNetWorth] = useState(null)
  const [checkingExpectedUseOfAccount, setCheckingExpectedUseOfAccount] = useState(null)
  const [checkingAccountUsageFrequency, setCheckingAccountUsageFrequency] = useState(null)
  const [checkingAccountDisclosure, setCheckingAccountDisclosure] = useState('Yes');
  const checkingAccountSuccessMessage = useRef(null);
  const checkingAccountFailMessage = useRef(null);
  const [addBillPayAccount, setAddBillPayAccount] = useState(null)
  const addBillPayAccountSuccessMessage = useRef(null);
  const addBillPayAccountFailMessage = useRef(null);

  const [wizardAccountIndOrJoint, setWizardAccountIndOrJoint] = useState('Individual');
  const [wizardWithholding, setWizardWithholding] = useState('No');
  const [wizardFirstName, setWizardFirstName] = useState('')
  const [wizardLastName, setWizardLastName] = useState('')
  const [wizardMiddleInitial, setWizardMiddleInitial] = useState('')
  const [wizardPhoneNumber, setWizardPhoneNumber] = useState('')
  const [wizardEmailAddress, setWizardEmailAddress] = useState('')
  const [wizardOccupation, setWizardOccupation] = useState('')
  const [wizardSelectAnnualIncome, setWizardSelectAnnualIncome] = useState(null)
  const [wizardSelectNetWorth, setWizardSelectNetWorth] = useState(null)
  const [wizardSourceOfNetWorth, setWizardSourceOfNetWorth] = useState(null)
  const [wizardExpectedUseOfAccount, setWizardExpectedUseOfAccount] = useState(null)
  const [wizardAccountUsageFrequency, setWizardAccountUsageFrequency] = useState(null)
  const [wizardAccountDisclosure, setWizardAccountDisclosure] = useState('Yes');
  const wizardFormSuccessMessage = useRef(null);
  const wizardFormFailMessage = useRef(null);

  const [displayBasic, setDisplayBasic] = useState(false);
  const [position, setPosition] = useState('center');

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const onClickDialog = (name, position) => {
      dialogFuncMap[`${name}`](true);

      if (position) {
          setPosition(position);
      }
  }

  const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
  }


  const billPayAccountOptions = [
    { name: 'Bank of Americorp', code: 'BOA' },
    { name: 'USA Mortgage', code: 'USM' },
    { name: 'Verizap', code: 'VER' },
    { name: 'TMobits', code: 'TMO' },
    { name: 'Amazonk', code: 'AMA' },
    { name: 'Z-Trade', code: 'ZTR' },
    { name: 'Chasem', code: 'CHA' },
    { name: 'Tulu', code: 'TUL' },
    { name: 'NewTube', code: 'NEW' },
    { name: 'Wizney', code: 'WIZ' }
];

  const addBillPayAccountTemplate = (option) => {
    return (
        <div className="addBillPay-item">
            <div>{option.name}</div>
        </div>
    );
}

  const savingsWithholdingOptions = ['No', 'Yes'];
  const savingsDisclosureAgreement = ['No', 'Yes'];

  const savingsSelectAnnualIncomeItems = [
    {label: '0-50k', value: '0-50k'},
    {label: '50k-100k', value: '50k-100k'},
    {label: '100k-250k', value: '100k-250k'},
    {label: '250k-1mil', value: '250k-1mil'},
    {label: '1mil+', value: '1mil+'}
  ];

  const savingsSelectNetWorthItems = [
    {label: '0-50k', value: '0-50k'},
    {label: '50k-100k', value: '50k-100k'},
    {label: '100k-250k', value: '100k-250k'},
    {label: '250k-1mil', value: '250k-1mil'},
    {label: '1mil+', value: '1mil+'}
  ];

  const savingsSourceOfNetWorthOptions = [
    {label: 'Employment', value: 'Employment'},
    {label: 'Inheritance', value: 'Inheritance'},
  ];

  const savingsExpectedUseOfAccountOptions = [
    {label: 'Savings', value: 'Savings'},
    {label: 'Transfers', value: 'Transfers'},
    {label: 'Bills', value: 'Bills'},
  ];

  const savingsAccountUsageFrequencyOptions = [
    {label: '1-2 Times a Week', value: '1-2 Times a Week'},
    {label: '5-10 Times a Week', value: '5-10 Times a Week'},
    {label: 'Less than Once a Week', value: 'Less than Once a Week'},
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const onClick = (itemIndex) => {
      let _activeIndex = activeIndex ? [...activeIndex] : [];

      if (_activeIndex.length === 0) {
          _activeIndex.push(itemIndex);
      } else {
          const index = _activeIndex.indexOf(itemIndex);

          if (index === -1) {
              _activeIndex.push(itemIndex);
          } else {
              _activeIndex.splice(index, 1);
          }
      }

      setActiveIndex(_activeIndex);
  };

  const accountTypeButtonClick = (buttonClickValue) => {
    setAccountType(buttonClickValue)
    if(buttonClickValue == "Savings") {
      console.log(buttonClickValue);
      setShowSavings(true);
      setShowChecking(false);
      setShowBillPay(false);
    } else if (buttonClickValue == "Checking") {
      console.log(buttonClickValue);
      setShowChecking(true);
      setShowSavings(false);
      setShowBillPay(false);
    } else {
      console.log(buttonClickValue);
      setShowBillPay(true)
      setShowChecking(false);
      setShowSavings(false);
    }
  }

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    wizardAccountType: "",
    wizardAccountIndOrJoint: "",
    wizardWithholding: "",
    wizardFirstName: "",
    wizardLastName: "",
    wizardMiddleInitial: "",
    wizardPhoneNumber: "",
    wizardEmailAddress: "",
    wizardOccupation: "",
    wizardSelectAnnualIncome: "",
    wizardSelectNetWorth: "",
    wizardSourceOfNetWorth: "",
    wizardExpectedUseOfAccount: "",
    wizardAccountUsageFrequency: "",
    wizardAccountDisclosure: ""
  });

  const FormTitles = ["Select Account Type", "Individual or Joint Account", "Contact Information", "Employment Details", "Bank Investment Profile", "Regulatory Questions", "Disclosures", "Submit Account Request for Processing"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SelectAccountType formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <JointOrIndividual formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <ContactInformation formData={formData} setFormData={setFormData} />;
    } else if (page === 3) {
      return <EmploymentDetails formData={formData} setFormData={setFormData} />;
    } else if (page === 4) {
      return <BankInvestmentProfile formData={formData} setFormData={setFormData} />;
    } else if (page === 5) {
      return <RegulatoryQuestions formData={formData} setFormData={setFormData} />;
    } else if (page === 6) {
      return <Disclosures formData={formData} setFormData={setFormData} />;
    }
    else {
      return <SubmitAddAccount formData={formData} setFormData={setFormData} />;
    }
  };

  const onSavingsButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (savingsLastName && savingsFirstName) {
      savingsAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Savings Account Submitted for Processing'});
    } else {
      savingsAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the First and Last Name'});
    }
  };

  const onCheckingButtonClick = (e) => {
    e.preventDefault(); // prevents page from reloading
    if (checkingLastName && checkingFirstName) {
      checkingAccountSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Checking Account Submitted for Processing'});
    } else {
      checkingAccountFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the First and Last Name'});
    }
  };

  async function heapCustomEvent() {
    let payload = { name: 'John Doe', occupation: 'gardener' };
    let res = await axios.post('http://httpbin.org/post', payload);
    let data = res.data;
    console.log(data);
  }

  const wizardFormSubmit = (e) => {
    //e.preventDefault(); // prevents page from reloading
    if (formData.wizardLastName && formData.wizardFirstName) {
      console.log(window.heap.identity);
      wizardFormSuccessMessage.current.show({severity: 'success', summary: 'Success:', detail: 'Account Submitted for Processing'});
    } else {
      wizardFormFailMessage.current.show({severity: 'error', summary: 'Error:', detail: 'For Demo purposes, at a minimum, enter the First and Last Name'});
    }
  };

    return (
        <div className="grid">
            <div className="card">
                <b>Try our New Account Wizard here, or continue below:</b>&nbsp;&nbsp;
                <Button label="Start Account Wizard" icon="pi pi-bolt" className="p-button-sm" onClick={() => onClickDialog('displayBasic')}></Button>
                <Messages ref={wizardFormSuccessMessage} />
                <Messages ref={wizardFormFailMessage} />
            </div>
            <div className="col-12 card">
                <div className="col-4">
                  <h5>Select Account Type</h5>
                  <SelectButton value={accountType} options={accountTypes} onChange={(e) => accountTypeButtonClick(e.value)} />
                </div>
                <div>
                  &nbsp;
                </div>
                { showSavings &&
                    <div id="savings">
                      <form onSubmit={onSavingsButtonClick}>
                        <Accordion activeIndex={0}>
                          <AccordionTab header="Savings: Joint or Individual?">
                              <div className="field-radiobutton">
                                <RadioButton inputId="individual" name="savingsAccountIndOrJoint" value="Individual" onChange={(e) => setSavingsAccountIndOrJoint(e.value)} checked={savingsAccountIndOrJoint === 'Individual'} />
                                <label htmlFor="individual">Individual</label>
                              </div>
                              <div className="field-radiobutton">
                                <RadioButton inputId="joint" name="savingsAccountIndOrJoint" value="Joint" onChange={(e) => setSavingsAccountIndOrJoint(e.value)} checked={savingsAccountIndOrJoint === 'Joint'} />
                                <label htmlFor="joint">Joint</label>
                              </div>
                          </AccordionTab>
                          <AccordionTab header="Savings: Contact Information">
                            <div className="grid p-fluid">
                              <div className="col-12 lg:col-6">
                                <h6>First Name</h6>
                                <InputText value={savingsFirstName} onChange={(e) => setSavingsFirstName(e.target.value)} />
                              </div>
                              <div className="col-12 lg:col-6">
                                <h6>Last Name</h6>
                                <InputText value={savingsLastName} onChange={(e) => setSavingsLastName(e.target.value)} />
                              </div>
                              <div className="col-12 lg:col-6">
                                <h6>Middle Initial</h6>
                                <InputText value={savingsMiddleInitial} onChange={(e) => setSavingsMiddleInitial(e.target.value)} />
                              </div>
                              <div className="col-12 lg:col-6">
                                <h6>Phone Number</h6>
                                <InputText value={savingsPhoneNumber} onChange={(e) => setSavingsPhoneNumber(e.target.value)} />
                              </div>
                              <div className="col-12 lg:col-6">
                                <h6>Email Address</h6>
                                <InputText value={savingsEmailAddress} onChange={(e) => setSavingsEmailAddress(e.target.value)} />
                              </div>
                            </div>

                          </AccordionTab>
                          <AccordionTab header="Savings: Employment Details">
                            <div className="col-12 lg:col-6">
                              <h6>Occupation</h6>
                              <InputText value={savingsOccupation} onChange={(e) => setSavingsOccupation(e.target.value)} />
                            </div>
                          </AccordionTab>
                          <AccordionTab header="Savings: Bank Investment Profile">
                            <div className="grid p-fluid">
                              <div className="col-12 lg:col-6">
                                <h6>Annual Income</h6>
                                <Dropdown value={savingsSelectAnnualIncome} options={savingsSelectAnnualIncomeItems} onChange={(e) => setSavingsSelectAnnualIncome(e.value)} placeholder="Select an Answer"/>
                              </div>
                              <div className="col-12 lg:col-6">
                                <h6>Total Net Worth</h6>
                                <Dropdown value={savingsSelectNetWorth} options={savingsSelectNetWorthItems} onChange={(e) => setSavingsSelectNetWorth(e.value)} placeholder="Select an Answer"/>
                              </div>
                            </div>

                          </AccordionTab>
                          <AccordionTab header="Savings: Regulatory Questions">
                          <div className="grid p-fluid">
                            <div className="col-12 lg:col-6">
                              <h6>Backup Withholding?</h6>
                              <SelectButton value={savingsWithholding} options={savingsWithholdingOptions} onChange={(e) => setSavingsWithholding(e.value)}></SelectButton>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Source of Net Worth</h6>
                              <Dropdown value={savingsSourceOfNetWorth} options={savingsSourceOfNetWorthOptions} onChange={(e) => setSavingsSourceOfNetWorth(e.value)} placeholder="Select an Answer"/>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Expected Use of Account</h6>
                              <Dropdown value={savingsExpectedUseOfAccount} options={savingsExpectedUseOfAccountOptions} onChange={(e) => setSavingsExpectedUseOfAccount(e.value)} placeholder="Select an Answer"/>
                            </div>
                            <div className="col-12 lg:col-6">
                              <h6>Account Usage Frequency</h6>
                              <Dropdown value={savingsAccountUsageFrequency} options={savingsAccountUsageFrequencyOptions} onChange={(e) => setSavingsAccountUsageFrequency(e.value)} placeholder="Select an Answer"/>
                            </div>
                          </div>
                          </AccordionTab>
                          <AccordionTab header="Savings: Disclosures">
                            <div className="grid p-fluid">
                              <div className="col-12">
                                <p>
                                This Deposit Agreement and Disclosures, the applicable Schedule of Fees, the signature card and
                                other account opening documents for your account are part of the binding contract between you and
                                us (this “Agreement”) for your deposit account and your deposit relationship with us. They contain
                                the terms of our agreement with you. Please read all of these documents carefully.
                                This Deposit Agreement and Disclosures also summarizes certain laws and regulations that apply to
                                common transactions, provides some disclosures for deposit accounts required by federal law, and
                                establishes terms that cover some transactions or situations that the law either does not cover or
                                allows us to change by this contract.
                                </p>
                              </div>
                              <div className="col-12 lg:col-6">
                                <h5> Do you agree with these disclosures?</h5>
                                <div className="field-radiobutton">
                                  <RadioButton inputId="disclosureYes" name="savingsAccountDisclosure" value="Yes" onChange={(e) => setSavingsAccountDisclosure(e.value)} checked={savingsAccountDisclosure === 'Yes'} />
                                  <label htmlFor="individual">Yes</label>
                                </div>
                                <div className="field-radiobutton">
                                  <RadioButton inputId="disclosureNo" name="savingsAccountDisclosure" value="No" onChange={(e) => setSavingsAccountDisclosure(e.value)} checked={savingsAccountDisclosure === 'No'} />
                                  <label htmlFor="joint">No</label>
                                </div>


                              </div>
                            </div>
                          </AccordionTab>
                          <AccordionTab header="Savings: Submit">
                            <Button label="Add Account for Processing" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
                            <div className="card">
                                <Messages ref={savingsAccountSuccessMessage} />
                                <Messages ref={savingsAccountFailMessage} />
                            </div>
                          </AccordionTab>
                      </Accordion>
                    </form>
                  </div>
                }

                { showchecking &&
                  <div id="checking">
                  <form onSubmit={onCheckingButtonClick}>
                    <Accordion activeIndex={0}>
                      <AccordionTab header="Checking: Joint or Individual?">
                          <div className="field-radiobutton">
                            <RadioButton inputId="individual" name="checkingAccountIndOrJoint" value="Individual" onChange={(e) => setCheckingAccountIndOrJoint(e.value)} checked={checkingAccountIndOrJoint === 'Individual'} />
                            <label htmlFor="individual">Individual</label>
                          </div>
                          <div className="field-radiobutton">
                            <RadioButton inputId="joint" name="checkingAccountIndOrJoint" value="Joint" onChange={(e) => setCheckingAccountIndOrJoint(e.value)} checked={checkingAccountIndOrJoint === 'Joint'} />
                            <label htmlFor="joint">Joint</label>
                          </div>
                      </AccordionTab>
                      <AccordionTab header="Checking: Contact Information">
                        <div className="grid p-fluid">
                          <div className="col-12 lg:col-6">
                            <h6>First Name</h6>
                            <InputText value={checkingFirstName} onChange={(e) => setCheckingFirstName(e.target.value)} />
                          </div>
                          <div className="col-12 lg:col-6">
                            <h6>Last Name</h6>
                            <InputText value={checkingLastName} onChange={(e) => setCheckingLastName(e.target.value)} />
                          </div>
                          <div className="col-12 lg:col-6">
                            <h6>Middle Initial</h6>
                            <InputText value={checkingMiddleInitial} onChange={(e) => setCheckingMiddleInitial(e.target.value)} />
                          </div>
                          <div className="col-12 lg:col-6">
                            <h6>Phone Number</h6>
                            <InputText value={checkingPhoneNumber} onChange={(e) => setCheckingPhoneNumber(e.target.value)} />
                          </div>
                          <div className="col-12 lg:col-6">
                            <h6>Email Address</h6>
                            <InputText value={checkingEmailAddress} onChange={(e) => setCheckingEmailAddress(e.target.value)} />
                          </div>
                        </div>

                      </AccordionTab>
                      <AccordionTab header="Checking: Employment Details">
                        <div className="col-12 lg:col-6">
                          <h6>Occupation</h6>
                          <InputText value={checkingOccupation} onChange={(e) => setCheckingOccupation(e.target.value)} />
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Checking: Bank Investment Profile">
                        <div className="grid p-fluid">
                          <div className="col-12 lg:col-6">
                            <h6>Annual Income</h6>
                            <Dropdown value={checkingSelectAnnualIncome} options={savingsSelectAnnualIncomeItems} onChange={(e) => setCheckingSelectAnnualIncome(e.value)} placeholder="Select an Answer"/>
                          </div>
                          <div className="col-12 lg:col-6">
                            <h6>Total Net Worth</h6>
                            <Dropdown value={checkingSelectNetWorth} options={savingsSelectNetWorthItems} onChange={(e) => setCheckingSelectNetWorth(e.value)} placeholder="Select an Answer"/>
                          </div>
                        </div>

                      </AccordionTab>
                      <AccordionTab header="Checking: Regulatory Questions">
                      <div className="grid p-fluid">
                        <div className="col-12 lg:col-6">
                          <h6>Backup Withholding?</h6>
                          <SelectButton value={checkingWithholding} options={savingsWithholdingOptions} onChange={(e) => setCheckingWithholding(e.value)}></SelectButton>
                        </div>
                        <div className="col-12 lg:col-6">
                          <h6>Source of Net Worth</h6>
                          <Dropdown value={checkingSourceOfNetWorth} options={savingsSourceOfNetWorthOptions} onChange={(e) => setCheckingSourceOfNetWorth(e.value)} placeholder="Select an Answer"/>
                        </div>
                        <div className="col-12 lg:col-6">
                          <h6>Expected Use of Account</h6>
                          <Dropdown value={checkingExpectedUseOfAccount} options={savingsExpectedUseOfAccountOptions} onChange={(e) => setCheckingExpectedUseOfAccount(e.value)} placeholder="Select an Answer"/>
                        </div>
                        <div className="col-12 lg:col-6">
                          <h6>Account Usage Frequency</h6>
                          <Dropdown value={checkingAccountUsageFrequency} options={savingsAccountUsageFrequencyOptions} onChange={(e) => setCheckingAccountUsageFrequency(e.value)} placeholder="Select an Answer"/>
                        </div>
                      </div>
                      </AccordionTab>
                      <AccordionTab header="Checking: Disclosures">
                        <div className="grid p-fluid">
                          <div className="col-12">
                            <p>
                            This Deposit Agreement and Disclosures, the applicable Schedule of Fees, the signature card and
                            other account opening documents for your account are part of the binding contract between you and
                            us (this “Agreement”) for your deposit account and your deposit relationship with us. They contain
                            the terms of our agreement with you. Please read all of these documents carefully.
                            This Deposit Agreement and Disclosures also summarizes certain laws and regulations that apply to
                            common transactions, provides some disclosures for deposit accounts required by federal law, and
                            establishes terms that cover some transactions or situations that the law either does not cover or
                            allows us to change by this contract.
                            </p>
                          </div>
                          <div className="col-12 lg:col-6">
                            <h5> Do you agree with these disclosures?</h5>
                            <div className="field-radiobutton">
                              <RadioButton inputId="checkingDisclosureYes" name="checkingAccountDisclosure" value="Yes" onChange={(e) => setCheckingAccountDisclosure(e.value)} checked={checkingAccountDisclosure === 'Yes'} />
                              <label htmlFor="individual">Yes</label>
                            </div>
                            <div className="field-radiobutton">
                              <RadioButton inputId="checkingDisclosureNo" name="checkingAccountDisclosure" value="No" onChange={(e) => setCheckingAccountDisclosure(e.value)} checked={checkingAccountDisclosure === 'No'} />
                              <label htmlFor="joint">No</label>
                            </div>


                          </div>
                        </div>
                      </AccordionTab>
                      <AccordionTab header="Checking: Submit">
                        <Button label="Add Account for Processing" type="submit" icon="pi pi-check-square" className="p-button-success"></Button>
                        <div className="card">
                            <Messages ref={checkingAccountSuccessMessage} />
                            <Messages ref={checkingAccountFailMessage} />
                        </div>
                      </AccordionTab>
                  </Accordion>
                </form>
                  </div>
                }

            </div>

            <div className="form">
              <form id="accountSettingsDialog" name="accountSettingsDialog">
                <Dialog header="Apply for your new account" visible={displayBasic} style={{ width: '40vw' }} onHide={() => {console.log("clicked close button"); setDisplayBasic(false);}}>
                  <div className="progressbar">
                    <div style={{ width: page === 0 ? "33.3%" : page == 1 ? "66.6%" : "100%" }}></div>
                  </div>
                  <div className="form-container">
                    <div className="header">
                      <h5>{FormTitles[page]}</h5>
                    </div>
                    <div className="body">{PageDisplay()}</div><h5></h5>
                    <div className="footer">

                      <Button id="Previous" disabled={page == 0} label="Previous" onClick={() => {setPage((currPage) => currPage - 1)}} />
                      &nbsp;&nbsp;
                      <Button id={page === FormTitles.length - 1 ? "Finish" : "Next"} label={page === FormTitles.length - 1 ? "Finish" : "Next"} onClick={() => {
                        if (page === FormTitles.length - 1) {
                          console.log(formData);
                          setDisplayBasic(false);
                          wizardFormSubmit();
                        } else {
                          setPage((currPage) => currPage + 1);
                        }

                      }} />
                    </div>
                  </div>
                </Dialog>
              </form>
            </div>


        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AddAccounts, comparisonFn);
