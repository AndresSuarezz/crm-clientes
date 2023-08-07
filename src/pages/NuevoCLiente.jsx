/* eslint-disable react/jsx-key */
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import Formulario from "../components/Formulario";
import Error from "../components/Error";
import { agregarCliente } from "../data/clientes";

export async function action({ request }) {
  const formData = await request.formData();
  const datos = Object.fromEntries(formData);
  const email = formData.get("email");

  //Validacion
  const errores = [];
  if (Object.values(datos).includes("")) {
    errores.push("Todos los campos son obligatorios");
  }

  // Validamos el email
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  if (!regex.test(email)) {
    errores.push("El email no es valido");
  }

  //Retornar datos y errores
  if (Object.keys(errores).length) {
    return errores;
  }

  //Agregar Cliente
  await agregarCliente(datos);

  return redirect("/");
}

const NuevoCLiente = () => {
  const errores = useActionData();
  const navigate = useNavigate();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo Cliente</h1>
      <p className="mt-3">
        Completa los campos para registrar un nuevo cliente
      </p>
      <div className="flex justify-end">
        <button
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase rounded mb-2"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
      </div>

      {/* Formulario */}
      <div className="bg-white shadow-md rounded-md md:w-3/4 mx-auto px-5 py-10 mt-5">
        {errores?.length &&
          errores.map((error, i) => <Error key={i}>{error}</Error>)}
        <Form method="post" noValidate>
          <Formulario />
          <input
            type="submit"
            value="Registrar Cliente"
            className="mt-5 w-full bg-blue-900 p-3 uppercase font-bold text-white text-lg rounded hover:bg-blue-800 transition-colors cursor-pointer"
          />
        </Form>
      </div>
    </>
  );
};

export default NuevoCLiente;
