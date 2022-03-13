export const ACTIONS = {
    signIn: {
        key: 'signin',
        label: 'Iniciar sesión'
    },
    signUp: {
        key: 'signup',
        label: 'Registrarse'
    }
}

export const USER_STORAGE_KEY = 'supabase.auth.token';

export const OPTIONS = {
    menu: [
        {
            name: "Inicio",
            ruta: "home",
            icon: "home",
        },
        {
            name: "Empresas",
            ruta: "libraries",
            icon: "business",
        },
        {
            name: "Convenios",
            ruta: "convenios",
            icon: "collections_bookmark"
        },
        {
            name: "Estudiante carnetizados",
            ruta: "estudiantes",
            icon: "perm_identity"
        }
    ],
    empresas:{
        labels: [
            "id",
            "nombre",
            "ruc",
            "email",
            "representante",
            "telefono",
            "actions"
        ],
        table: "empresa"
    },
    convenios:{
        labels: [
            "nombre",
            "encargado",
            "url",
            "periodo",
            "descripcion",
            "empresa",
            "actions",
        ],
        table: "convenio"
    },
    estudiantesCarnetizados:{
        labels: [
            "nombres",
            "apellidos",
            "codigo",
            "ci",
            "telefono",
            "email",
            "actions"
        ],
        table: "estudiante"
    }
}