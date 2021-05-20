// Arrancamos la app de Vue, creando una nueva instancia de Vue.
const app = new Vue({
   el : '#app',
   data(){
       return{
           dia:true,
           ciudadBuscar: "",
           clima: {
               nombreCiudad: localStorage.getItem("nombreCiudad"),
               pais: localStorage.getItem("pais"),
               temperatura: localStorage.getItem("temp"),
               descripcion: localStorage.getItem("desc"),
               tempBaja: localStorage.getItem("tempBaja"),
               tempAlta: localStorage.getItem("tempAlta"),
               feelsLike: localStorage.getItem("feelsLike"),
               humedad: localStorage.getItem("humedad"),
           },
       }
   },
    methods:{
       /* La funcion donde hacemos el fetch*/
        getClima: async function (){
           console.log("Obteniando el click del form para ejecutar el fetch aca.");

           //Datos para la petición
           console.log(this.ciudadBuscar);
           const APPI_KEY = "c6f6c8cacc4c4b6d31edf9d80cd34c25";
           const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.ciudadBuscar}&appid=${APPI_KEY}&units=metric`;


           // Petición al end Point de weather
           const response = await fetch(URL);
           const data = await response.json();
           console.log(data);

           //Asignarle los datos del json a cada valor de nuestra app
           this.ciudadBuscar = "";
           this.clima.nombreCiudad = data.name;
           this.clima.pais = data.sys.country;
           this.clima.temperatura = Math.round(data.main.temp);
           this.clima.descripcion = data.weather[0].description;
           this.clima.tempBaja = Math.round(data.main.temp_min);
           this.clima.tempAlta = Math.round(data.main.temp_max);
           this.clima.feelsLike = Math.round(data.main.feels_like);
           this.clima.humedad = Math.round(data.main.humidity);
           const tiempoDeDia = data.weather[0].icon;

           //Guardo la data en localStorage de mi busqueda
           localStorage.setItem("nombreCiudad", this.clima.nombreCiudad);
           localStorage.setItem("pais", this.clima.pais);
           localStorage.setItem("temp", this.clima.temperatura);
           localStorage.setItem("desc", this.clima.descripcion);
           localStorage.setItem("tempBaja", this.clima.tempBaja);
           localStorage.setItem("tempAlta", this.clima.tempAlta);
           localStorage.setItem("feelsLike", this.clima.feelsLike);
           localStorage.setItem("humedad", this.clima.humedad);

            if(tiempoDeDia.includes("n")){
                this.dia = false;

            }else{
                this.dia = true;
                console.log(this.dia);
            }



           //Seteando si es de dia o de noche.

       },
    },
});
