/* eslint-disable react/prop-types */
import { Formik, Field, Form, ErrorMessage } from "formik";
import {
  initialValues,
  UpdateUser,
  validationSchema,
} from "../../../libs/admin/users";
import { useContext, useEffect, useState } from "react";
import { getData, getDataWithReq } from "../../../libs/axios";
import { useRefreshTable } from "../../../hooks/refreshTable";
import { warningToast } from "../../../libs/sonnerToast";
import { MyContext } from "../../../context/context";
import { Spinner } from "@nextui-org/react";

const EditUser = ({ user, isMyProfileEdit }) => {
  const { actualUser, setActualUser } = useContext(MyContext);
  const { refresh, setRefresh } = useRefreshTable();
  const [countries, setCountries] = useState([]); // ?get all countries
  const [departments, setDepartments] = useState([]); // ?get all departments
  const [cities, setCities] = useState([]); // ?get all cities
  const [isLoading, setIsLoading] = useState(false); // ?set is loading Generally
  const [inputLoading, setInputLoading] = useState(false); // ? set Loading input
  const [countrySelected, setCountrySelected] = useState(user.id_country); //
  const [departmentSelected, setDepartmentSelected] = useState(user.id_department)
  const isSameUser = actualUser.id === user.id;

  const EditProfileInitialValues = {
    id: user.id,
    name: user.name,
    documentType: !user.strIDTipe ? user.documentType : user.strIDTipe,
    document: user.document,
    country: user.id_country,
    strCountry: user.country,
    department: user.id_department,
    strDepartment: user.department,
    city: user.id_city,
    strCity:user.city,
    address: user.address,
    phone: user.phone,
    email: user.email,
  };

  // ?Function to ensure the phone field only accepts numbers
  const handlePhoneChange = (e, setFieldValue) => {
    const onlyNums = e.target.value.replace(/\D/g, ""); // Remove all non-digit characters
    const limitedNums = onlyNums.slice(0, 12); // Limit to 12 characters
    setFieldValue("phone", limitedNums); // Set the value in Formik
  };

  // ?function to update the users and refresh dataTable fields
  const handleSubmit = async (values, { setSubmitting }) => {
    // Comparar valores iniciales con los actuales
    const hasChanged = Object.keys(EditProfileInitialValues).some(
      (key) => EditProfileInitialValues[key] !== values[key]
    );
    if (!hasChanged) {
      warningToast("No hay cambios, verica toda la información");
      setSubmitting(false);
      return;
    }
    // console.log(values)
    setIsLoading(true);

    try {
      UpdateUser(values);
      if (isMyProfileEdit || isSameUser) {
        setActualUser((prevUser) => ({ ...prevUser, name: values.name }));
      }
    } catch (error) {
      console.log("Error ", error);
    } finally {
      !refresh ? setRefresh(true) : setRefresh(false);
      setSubmitting(false);
    }
    setIsLoading(false);

  };

  // ?function to get all data of departments when country is changed
  const handleChangeCountry = async (e, setFieldValue) => {
    const country = { id_country: parseInt(e.target.value) };
    setCountrySelected(country.id_country)
    setFieldValue("country", country.id_country);
    setFieldValue("strCountry",e.target.options[e.target.selectedIndex].label)
    setFieldValue("department", "");
    setFieldValue("city", "");
    setFieldValue("strDepartment", "");
    setFieldValue("strCity", "");
    setInputLoading(true);
    try {
      const department = await getDataWithReq("admin/getDepartments", country);
      setDepartments(department.deparments);
      setCities([]);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setInputLoading(false);
    }
  };

  // ? function to get data of all cities when department is changed
  const handleChangeDepartments = async (e, setFieldValue) => {
    const idDepartment = { id_department: parseInt(e.target.value) };
    setFieldValue("department", idDepartment.id_department);
    setFieldValue("strDepartment",e.target.options[e.target.selectedIndex].label)
    setFieldValue("city", "");
    setInputLoading(true);
    try {
      const city = await getDataWithReq("admin/getCities", idDepartment);
      setCities(city.cities);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setInputLoading(false);
    }
  };

  const handleChangeCity = async (e, setFieldValue) => {
    setFieldValue("city", parseInt(e.target.value));
    setFieldValue("strCity",e.target.options[e.target.selectedIndex].label)
  }

  // ?useEffect to get locations Data22
  useEffect(() => {
    // console.log(userhook);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const country = await getData("admin/getCountries");
        setCountries(country.countries);
        if(countrySelected === 1 ){
          // console.log(user.id_country);
          const department = await getDataWithReq("admin/getDepartments", {id_country: parseInt(countrySelected),});
          setDepartments(department.deparments);
          // console.log(user)
          const city = await getDataWithReq("admin/getCities", {id_department: parseInt(departmentSelected),});
          setCities(city.cities);
        }
        
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isLoading || !user ? (
        <div>
          {" "}
          <h1>Cargando...</h1>
        </div>
      ) : (
        <Formik
          initialValues={user ? EditProfileInitialValues : initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(
            { setFieldValue } // Extract setFieldValue from Formik props
          ) => (
            <Form className="flex flex-col flex-nowrap justify-center border-white w-full">
              <div className="flex flex-nowrap ">
                <div className="flex flex-col gap-2 justify-center items-center w-full transition-all duration-50">
                  <div className="overflow-y-auto md:overflow-hidden w-full">
                    <div className="flex w-full gap-3 mb-2 flex-wrap md:flex-nowrap">
                      <div className="flex flex-col h-14 w-full">
                        <div className="flex w-full  ">
                          <Field
                            className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                            type="text"
                            title="Nombre Completo"
                            name="name"
                            placeholder="Nombre Completo"
                            maxLength="255"
                          />
                        </div>
                        <ErrorMessage
                          name="name"
                          className="text-red-600 font-semibold text-sm"
                          component="span"
                        />
                      </div>
                      <div className="flex w-full">
                        <div className="flex flex-col h-14 w-[30%]">
                          <div className="flex w-full  ">
                            <Field
                              as="select"
                              className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                              type="text"
                              title="Documento"
                              name="documentType"
                              placeholder="Documento"
                              maxLength="255"
                            >
                              <option
                                value="1"
                                label="CC"
                                title="Cedula de Ciudadania"
                              />
                              <option
                                value="2"
                                label="CE"
                                title="Cedula de Extrangeria"
                              />
                              <option
                                value="3"
                                label="NIT"
                                title="Número de Identificación Tributaria"
                              />
                              <option
                                value="5"
                                label="RUT"
                                title="Registro Único Tributario"
                              />
                              <option value="4" label="PP" title="Pasaporte" />
                            </Field>
                          </div>
                          <ErrorMessage
                            name="documentType"
                            className="text-red-600 font-semibold text-sm"
                            component="span"
                          />
                        </div>
                        <div className="flex flex-col h-14 w-[70%]">
                          <div className="flex w-full  ">
                            <Field
                              className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                              type="text"
                              title="Documento"
                              name="document"
                              placeholder="Documento"
                              maxLength="255"
                            />
                          </div>
                          <ErrorMessage
                            name="document"
                            className="text-red-600 font-semibold text-sm"
                            component="span"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full gap-3 mb-2 flex-wrap sm:flex-nowrap">
                      <div className="flex flex-col h-14 w-full sm:w-[50%]">
                        <div className="flex w-full  ">
                          <Field
                            as="select"
                            className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                            title="Pais"
                            name="country"
                            onChange={(e) => handleChangeCountry(e, setFieldValue) } 
                          >
                            <option value="" label={ inputLoading ? "Cargando Información..." : "Selecciona un Pais" } />
                            {countries.map((country) => (
                              <option key={country.id_country} value={country.id_country} label={country.name} />
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage  name="country" className="text-red-600 font-semibold text-sm" component="span" />
                      </div>

                      <div className="flex flex-col h-14 w-full sm:w-[50%]">
                        <div className="flex w-full  ">
                          {countrySelected === 1 ? (
                            <Field
                              as="select"
                              className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                              title="Departamento"
                              name="department"
                              onChange={(e) =>handleChangeDepartments(e, setFieldValue)}
                            >
                              <option value="" label="Selecciona un Departamento"/>
                              {departments &&
                                departments.map((department) => (
                                  <option key={department.id_department} value={department.id_department} label={department.name} />
                                ))}
                            </Field>
                          ) : (
                            <Field
                              type="text"
                              className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                              title="Departamento"
                              placeholder="Departamento/Estado"
                              name="strDepartment"
                            />
                          )}
                        </div>
                        <ErrorMessage name="strDepartment" className="text-red-600 font-semibold text-sm" component="span" />
                      </div>
                    </div>

                    <div className="flex w-full gap-3 mb-2 flex-wrap sm:flex-nowrap">
                      <div className="flex flex-col h-14 w-full sm:w-[50%]">
                        <div className="flex w-full  ">
                          {countrySelected === 1 ? (
                            <Field
                              as="select"
                              type="number"
                              className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                              title="Municipio"
                              name="city"
                              onChange={(e) => handleChangeCity(e, setFieldValue)}
                            >
                              <option value="" label="Selecciona una ciudad" />
                              {cities.map((city) => (
                                <option key={city.id_city} value={city.id_city} label={city.name}/>
                              ))}
                            </Field>
                          ) : (
                            <Field
                              type="text"
                              className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                              title="Municipio"
                              placeholder="Ciudad/Municipio"
                              name="strCity"
                            />
                          )}
                        </div>
                        <ErrorMessage
                          name="strCity"
                          className="text-red-600 font-semibold text-sm"
                          component="span"
                        />
                      </div>

                      <div className="flex flex-col h-14 w-full sm:w-[50%]">
                        <div className="flex w-full  ">
                          <Field
                            className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                            type="text"
                            title="Dirección"
                            name="address"
                            placeholder="Dirección"
                            maxLength="255"
                          />
                        </div>
                        <ErrorMessage
                          name="address"
                          className="text-red-600 font-semibold text-sm"
                          component="span"
                        />
                      </div>
                    </div>
                    <div className="flex w-full gap-3 mb-2 flex-wrap md:flex-nowrap">
                      <div className="flex flex-col h-14 w-full">
                        <div className="flex w-full  ">
                          <Field
                            className=" focus:outline-[#b34eda] rounded-lg bg-gray-50 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                            type="text"
                            title="Teléfono"
                            name="phone"
                            placeholder="Teléfono"
                            onChange={(e) =>
                              handlePhoneChange(e, setFieldValue)
                            } // Call handlePhoneChange here
                            maxLength="255"
                          />
                        </div>
                        <ErrorMessage
                          name="phone"
                          className="text-red-600 font-semibold text-sm"
                          component="span"
                        />
                      </div>

                      <div className="flex flex-col h-14 w-full">
                        <div className="flex w-full  ">
                          <Field
                            disabled
                            className="focus:outline-[#b34eda] rounded-lg bg-gray-200 border text-gray-900 w-full text-sm border-gray-300 p-2.5"
                            type="email"
                            title="Email"
                            name="email"
                            placeholder="Email"
                            maxLength="255"
                          />
                        </div>
                        <ErrorMessage
                          name="email"
                          className="text-red-600 font-semibold text-sm"
                          component="span"
                        />
                      </div>
                    </div>
                  </div>
                  <div className=" focus:outline-[#b34eda] flex flex-wrap gap-2 justify-center w-full mt-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-[250px] text-white text-md bg-primary font-medium rounded-lg px-5 py-2.5 transition-all duration-300 ease-in-out hover:scale-105"
                    >
                      {isLoading ? <Spinner color="white" size="sm"/> : "Actualizar"}

                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default EditUser;
