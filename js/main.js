// Arrancamos la app de Vue, creando una nueva instancia de Vue.
const app = new Vue({
   el : '#app',
   data(){
       return{
           dia:true,
           ciudadBuscar: "",
           flag:null,
           clima: {
               nombreCiudad: localStorage.getItem("nombreCiudad"),
               pais: localStorage.getItem("pais"),
               temperatura: localStorage.getItem("temp"),
               descripcion: localStorage.getItem("desc"),
               tempBaja: localStorage.getItem("tempBaja"),
               tempAlta: localStorage.getItem("tempAlta"),
               feelsLike: localStorage.getItem("feelsLike"),
               humedad: localStorage.getItem("humedad"),
               viento: localStorage.getItem("viento"),
               lat: "",
               lon: "",
           },
       }
   },
    methods:{
       /* La funcion donde hacemos el fetch*/
        getClima: async function (){
           console.log("Obteniando el click del form para ejecutar el fetch aca.");

           //Datos para la petición
           console.log(this.ciudadBuscar);
           const APPI_KEY = "";
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
           this.clima.viento = data.wind.speed;
           this.clima.lat = data.coord.lat;
           this.clima.lon = data.coord.lon;

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
           localStorage.setItem("viento", this.clima.viento);

            if(tiempoDeDia.includes("n")){
                this.dia = false;

            }else{
                this.dia = true;
                console.log(this.dia);
            }

            let op = this.clima.descripcion;
            let imgClima = document.getElementById('img-clima');

            if(this.flag == null){
                switch (op){
                    case "overcast clouds":
                        const img = document.createElement("img");
                        img.src= "img/nublado.png";
                        img.alt = "Nublado";
                        img.width = 150;
                        img.id = "toogle-clima";
                        imgClima.appendChild(img);
                        this.flag = false;
                        break;

                    case "light rain":
                        const img2 = document.createElement("img");
                        img2.src= "img/lluvia.png";
                        img2.alt = "lluvia";
                        img2.width = 150;
                        img2.id = "toogle-clima";
                        imgClima.appendChild(img2);
                        break;
                }
            }else{
                let borrado = document.getElementById('toggle-clima').remove();
                console.log(borrado);
                this.flag = true;
            }

           //Seteando si es de dia o de noche.

       },
    },
});
