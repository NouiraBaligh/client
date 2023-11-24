import { useEffect, useState } from "react";
import swal from "sweetalert";
import "../../Login.css";
import { jwtDecode } from "jwt-decode";

function CreateArticle({ fetchData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [imageUploaded, setImageUploaded] = useState("");
  const decodeToken = (token) => {
    const decoded = jwtDecode(token);
    return decoded;
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decodeToken(token);
      setUser(decodedToken.id);
    }
  }, []);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setImageUploaded(event.target.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  };
  const handleCreateArticle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("user", user);

    try {
      const response = await fetch("http://localhost:5000/articles/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setTitle("");
        setDescription("");
        setImage("");
        setImageUploaded("");
        setErrors({});
        swal({
          title: "Succès",
          text: "Article créé avec succès!",
          icon: "success",
          timer: 2500,
        });
        const boutonOffcanvas = document.getElementById(
          "closeOffcanvasCreateArticle"
        );
        boutonOffcanvas.click();
        fetchData();
      } else {
        setErrors(data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-body-border"
      tabIndex="-1"
      id="offcanvasAdd"
      aria-labelledby="offcanvasRightLabel"
    >
      <div className="offcanvas-header ">
        <h5 id="offcanvasAdd" class="offcanvas-title">
          Ajouter un article
        </h5>
        <button
          id="closeOffcanvasCreateArticle"
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <div className="bg-white">
          <label htmlFor="fileInput" className="d-flex justify-content-center">
            <div className="mb-2">
              {imageUploaded ? (
                <img
                  src={imageUploaded}
                  alt="Uploaded"
                  className="imgUploaded "
                />
              ) : (
                <img
                  src="../input-pictures.png"
                  alt="Placeholder"
                  className="pointer "
                />
              )}
            </div>
          </label>
          <input
            type="file"
            id="fileInput"
            name="profile_picture"
            className="d-none"
            accept="image/png, image/gif, image/jpeg"
            required
            onChange={handleImageChange}
          />
          {errors.image && (
            <div className="error-message mb-3 text-center">{errors.image}</div>
          )}
        </div>
        <div class="flex-column mb-3">
          <label>Titre * </label>
        </div>
        <div class="inputForm mb-3">
          <input
            type="text"
            class="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="saisir le titre "
          />
        </div>
        {errors.title && (
          <div className="error-message mb-3">{errors.title}</div>
        )}
        <div class="flex-column mb-3">
          <label>Description * </label>
        </div>
        <div class="inputForm mb-3">
          <input
            type="text"
            class="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="saisir la description"
          />
        </div>
        {errors.description && (
          <div className="error-message mb-3">{errors.description}</div>
        )}
        <button
          class="btn btn-dark "
          type="button"
          onClick={handleCreateArticle}
        >
          Ajouter
        </button>
      </div>
    </div>
  );
}
export default CreateArticle;
