import { Formik, Field, Form as FormikForm, } from 'formik';
import Buttons from './Buttons';
import { getLocationAndSetValues } from '../utils/Location.tsx';

const Form = ({handleGetData} : {handleGetData: any}) => {
	return (
		<Formik
		initialValues={{
		  venueSlug: '',
		  cartValue: 0,
		  userLatitude: 0,
		  userLongitude: 0,
		}}
		onSubmit={(values) => {
		  console.log('Form submitted:', values);
		}}
	  >
		{({ values, setFieldValue }) => (
		  <FormikForm>
			<h4 className="header">Details</h4>
			<div className="form-group">
			  <label className='header'>Venue slug</label>
			  <Field className='input' type="text" name="venueSlug" placeholder="Enter venue slug" />
  
			  <label className='header'>Cart value €</label>
			  <Field className='input' type="number" name="cartValue" placeholder="Enter cart value" />
  
			  <label className='header'>User latitude</label>
			  <Field className='input' type="number" name="userLatitude" placeholder="Enter latitude" />
  
			  <label className='header'>User longitude</label>
			  <Field className='input' type="number" name="userLongitude" placeholder="Enter longitude" />
			</div>
			<Buttons
				name="Get location"
				onClick={() => getLocationAndSetValues(setFieldValue, (ErrorMessage) => alert(ErrorMessage))}
				/>
			<Buttons
				name="Calculate total price"
				onClick={() =>
					handleGetData({
						venue: values.venueSlug, 
						cartValue: values.cartValue, 
						latitude: values.userLatitude, 
						longitude: values.userLongitude
					})
				}
			/>
		  </FormikForm>
		)}
	  </Formik>
	);
  };
  
export default Form;