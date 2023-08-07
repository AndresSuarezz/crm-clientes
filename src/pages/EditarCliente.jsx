/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-control-regex */
//import Error from "../components/Error";
import Error from "../components/Error";
import Formulario from "../components/Formulario";
import { obtenerCliente, actualizarCliente } from "../data/clientes";
import { Form, useNavigate, useLoaderData, redirect, useActionData } from "react-router-dom";

// para obtener la informacion del usuario
export async function loader({ params }) {
  const cliente = await obtenerCliente(params.clienteId);

  if (Object.values(cliente).length === 0) {
    throw new Response("", {
      status: 404,
      statusText: "No hay resultados, el cliente no existente",
    });
  }
  return cliente;
}

// para enviar la informacion actualizada del formulario
export async function action({ request, params }) {
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

  //Actualizar el cliente
  await actualizarCliente(params.clienteId ,datos);

  return redirect("/");
}

const EditarCliente = () => {
  const navigate = useNavigate();
  const cliente = useLoaderData();
  const errores = useActionData();

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">Aqui podras modificar la informacion del cliente</p>
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
        { errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error>) }
        <Form method="put" noValidate>
          <Formulario cliente={cliente} />
          <input
            type="submit"
            value="Guardar Cambios"
            className="mt-5 w-full bg-blue-900 p-3 uppercase font-bold text-white text-lg rounded hover:bg-blue-800 transition-colors cursor-pointer"
          />
        </Form>
      </div>
    </>
  );
};

export default EditarCliente;
