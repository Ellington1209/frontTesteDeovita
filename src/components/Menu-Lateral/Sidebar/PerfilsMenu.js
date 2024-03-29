import { Home, SupportAgent, LocalMall, Person, Assignment } from "@mui/icons-material";

const PerfilsMenu = [
  // admin array =0 perfil =1
  [
    {
      name: "Dashboard",
      icon: Home,
      route: "/dashboard",
      isSubmenu: false,
    },

    {
      name: "Clientes",
      icon: Person,
      route: "#",
      isSubmenu: true,
      submenu: [

        {
          name: "Cadastro Cliente",
          submenuRoute: "/addcliente",
        },
        {
          name: "Consulta Cliente",
          submenuRoute: "/consultacliente",
        },

      ]
    }
  ]

];

export default PerfilsMenu;
