import "./landing.css"
import { Link } from "react-router-dom"
import Pantalla from "../../assets/pantalla-engranaje.png"
import Caja from "../../assets/Caja.png"
import PDF from "../../assets/pdf.png"
import Beneficio1 from "../../assets/Beneficio-1.png"
import Beneficio2 from "../../assets/Beneficio-2.png"
import presentacion from "../../assets/presentacion.png"
function Landing() {
    return (
        <>
            <div className="Header-box">


                <div className="Header">
                    <div>
                        <h4>
                            STOCKLY
                        </h4>
                    </div>

                    <div className="Header-login">

                        <Link to="/ingreso/login">Iniciar Sesion</Link>
                        <Link to="/ingreso/register">Registarse </Link>

                    </div>

                </div>
                <div className="landing-body">
                    <div>
                        <div className="landing-body-titulo">
                            <h4>
                                Toma el control de tu <b>STOCK</b> con un solo click
                            </h4>
                            
                        </div>

                        <div>
                            <button><Link to="/ingreso/login">Iniciar Sesion</Link></button>

                            <button><Link to="/ingreso/register">Registrarse</Link></button>
                        </div>
                    </div>


                    <img src={presentacion} alt="" />



                </div>
                <div className="publicidad">
                    <h4>La herramienta ideal para pequeñas y medianas empresas</h4>
                </div>
                <div className="Funciones">
                    <div className="Funciones-box">
                        <div>
                            <img src={Pantalla} alt="" />
                        </div>
                        <div>
                            <h4>Simplifica tu gestion de inventario</h4>
                        </div>

                    </div>
                    <div className="Funciones-box">
                        <div>
                            <img src={PDF} alt="" />
                        </div>
                        <div>
                            <h4>Simplifica tu gestion de inventario</h4>
                        </div>
                    </div>

                    <div className="Funciones-box">
                        <div>
                            <img src={Caja} alt="" />
                        </div>
                        <div>
                            <h4>Simplifica tu gestion de inventario</h4>
                        </div>
                    </div>


                </div>

                <div className="Beneficios-box">
                        <div className="Beneficios">
                    <img src={Beneficio1} alt="" />
                     <h4>
                     Mejora la precisión 
                     de los inventarios
                     </h4>
                </div>
               

               
                        <div className="Beneficios">
                   
                     <h4>
                     Reduce los errores humanos
                     </h4> 
                     <img src={Beneficio2} alt="" />
                </div>
               
             </div>


<footer className="footer">

<h4>
Facilita la toma de decisiones basadas en datos
</h4>

</footer>

            </div>
        </>
    )
}

export default Landing