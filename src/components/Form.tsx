import { Formik, Field, Form as FormikForm } from 'formik';

const Form = ({ cartValue, setCartValue, userLatitude, userLongitude } : { cartValue: number, setCartValue: (value: number) => void, userLatitude: number, userLongitude: number })  => {
  return (
    <Formik
      initialValues={{ venueSlug: '', cartValue: '', userLatitude: userLatitude, userLongitude: userLongitude }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      <FormikForm>
        <div className="form-group">
          <label className="header">Venue slug</label>
          <Field
		  	className='input'
		  	type="text"
			name="venueSlug"
			placeholder="enter"
			data-test-id="venueSlug"
			/>

          <label className="header">Cart value €</label>
          <Field
		  	className='input'
		  	type="text"
			name="cartValue" 
			placeholder="enter" 
			data-test-id="cartValue" 
			value={cartValue}
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => setCartValue(parseFloat(event.target.value))}
			/>

          <label className="header">User latitude</label>
          <Field
		 	className='input'
		  	type="number"
			name="userLatitude"
			placeholder="enter"
			data-test-id="userLatitude" 
			value={userLatitude} readOnly
			/>

          <label className="header">User longitude</label>
          <Field
		  className='input'
		  type="number"
		  name="userLongitude"
		  placeholder="enter"
		  data-test-id="userLongitude"
		  value={userLongitude} readOnly
		  />
	  </div>
	  </FormikForm>
    </Formik>
  );
};

export default Form;