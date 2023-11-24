import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Login.css";

function Register() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [job, setJob] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showcCofirmPassword, setShowcCofirmPassword] = useState(false);
  const toggleShowConfirmPassword = () => {
    setShowcCofirmPassword(!showcCofirmPassword);
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      name: name,
      address: address,
      job: job,
      phone: phone,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setName("");
        setAddress("");
        setPhone("");
        setJob("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setErrors({});
        swal({
          title: "Inscription réussie",
          text: "Vous êtes inscrit avec succès!",
          icon: "success",
          timer: 2500,
        }).then(() => {
          window.location.href = "/login";
        });
      } else {
        setErrors(data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la requête:", error);
    }
  };

  return (
    <div className="div-login">
      <form class="form" onSubmit={handleRegister}>
        <div className="pt-4 pb-2">
          <p className="text_title_login ">S'inscrire</p>
          <p className="text-center  text_under_title_login">
            Inscrivez-vous pour jouir de nos services.
          </p>
        </div>
        <div class="flex-column">
          <label>Nom complet * </label>
        </div>
        <div class="inputForm">
          <input
            type="text"
            class="input"
            onChange={(e) => setName(e.target.value)}
            placeholder="saisir votre nom complet"
          />
        </div>
        {errors.name && <div className="error-message">{errors.name}</div>}
        <div class="flex-column">
          <label>Email *</label>
        </div>
        <div class="inputForm">
          <svg height="20" viewBox="0 0 32 32" width="20">
            <g id="Layer_3" data-name="Layer 3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
            </g>
          </svg>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            class="input"
            placeholder="saisir votre email"
          />
        </div>
        {errors.email && <div className="error-message">{errors.email}</div>}
        <div class="flex-column">
          <label>Adresse * </label>
        </div>
        <div class="inputForm">
          <input
            type="text"
            class="input"
            onChange={(e) => setAddress(e.target.value)}
            placeholder="saisir votre Adresse"
          />
        </div>
        {errors.address && (
          <div className="error-message">{errors.address}</div>
        )}
        <div class="flex-column">
          <label>Emploie </label>
        </div>
        <div class="inputForm">
          <input
            type="text"
            class="input"
            onChange={(e) => setJob(e.target.value)}
            placeholder="saisir votre emploie"
          />
        </div>
        <div class="flex-column">
          <label>Téléphone </label>
        </div>
        <PhoneInput
          placeholder="saisir votre  téléphone"
          onChange={(value, country, event) =>
            setPhone(event.target.value ? event.target.value : value)
          }
        />
        <div class="flex-column">
          <label>Mot de passe *</label>
        </div>
        <div class="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            class="input"
            placeholder="saisir votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <svg
            viewBox="0 0 576 512"
            height="1em"
            onClick={toggleShowPassword}
            style={{ cursor: "pointer" }}
          >
            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
          </svg>
        </div>
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}

        <div class="flex-column">
          <label>Confirmer mot de passe *</label>
        </div>
        <div class="inputForm">
          <svg height="20" viewBox="-64 0 512 512" width="20">
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
          </svg>
          <input
            type={showcCofirmPassword ? "text" : "password"}
            class="input"
            placeholder="confirmer votre mot de passe"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <svg
            viewBox="0 0 576 512"
            height="1em"
            onClick={toggleShowConfirmPassword}
            style={{ cursor: "pointer" }}
          >
            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
          </svg>
        </div>
        {errors.confirmPassword && (
          <div className="error-message">{errors.confirmPassword}</div>
        )}

        <button class="button-submit">S'inscrire</button>
        <p class="p">
          Vous avez déjà un compte?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span class="span">Se connecter</span>
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
