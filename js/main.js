// Arrancamos la app de Vue, creando una nueva instancia de Vue.
const app = new Vue({
   el : '#app',
   data(){
       return{
           ciudadBuscar: "",
           clima: {
               nombreCiudad: "london",
               pais: "UK",
               temperatura: 12,
               descripcion: "Muchas Nubes",
               tempBaja: "8",
               tempAlta: "19",
               feelsLike: "20",
               humedad: "70",
           },
       }
   },
    methods:{
       /* La funcion donde hacemos el fetch*/
       getClima(){
           console.log("Obteniando el click del form para ejecutar el fetch aca.");

           // Peticion al end Point de weather
           console.log(this.ciudadBuscar);
           const APPI_KEY = "c6f6c8cacc4c4b6d31edf9d80cd34c25";
           const URL = `https://api.openweathermap.org/data/2.5/weather?q=${this.ciudadBuscar}&appid=${APPI_KEY}&units=metric`;
       }
    }
});
