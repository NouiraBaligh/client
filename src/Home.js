import { useEffect, useState } from "react";
import "./Login.css";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import CreateArticle from "./pages/articles/CreateArticle";
import UpdateArticle from "./pages/articles/UpdateArticle";
import { jwtDecode } from "jwt-decode";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function Home({ userInfo, setUserInfo, fetchUserInfo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [job, setJob] = useState("");
  const [avatar, setAvatar] = useState("");
  const [imageUploaded, setImageUploaded] = useState("");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAddress(userInfo.address);
      setPhone(userInfo.phone);
      setJob(userInfo.job);
      setAvatar(userInfo.avatar);
    }
  }, [userInfo]);
  const handleImageChangeUpdate = (e) => {
    setAvatar(e.target.files[0]);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const readerUpdate = new FileReader();

      readerUpdate.onload = (event) => {
        setImageUploaded(event.target.result);
      };

      readerUpdate.readAsDataURL(selectedFile);
    }
  };
  const handleUpdateUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("address", address);
      formData.append("job", job);
      formData.append("phone", phone);
      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      }
      const response = await fetch("http://localhost:5000/update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo({
          ...userInfo,
          name: data.user.name,
          email: data.user.email,
          address: data.user.address,
          job: data.user.job,
          phone: data.user.phone,
          avatar: data.user.avatar,
        });
        fetchUserInfo();
        setErrors({});
        swal({
          title: "Succès",
          text: "Informations mises à jour avec succès!",
          icon: "success",
          timer: 2500,
        });
        const boutonOffcanvas = document.getElementById("closeOffcanvasUpdate");
        boutonOffcanvas.click();
      } else if (data.message) {
        setErrors(data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: " var(--gray-50, #F9FAFB);",
        color: "#5d7079",
      },
    },
  };
  const columns = [
    {
      name: "#",
      selector: (row, index) => ++index,
      width: "15%",
      sortable: true,
    },
    {
      name: "Titre",
      selector: (row) => row.title,
      width: "Z0%",
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      width: "20%",
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          src={`http://localhost:5000/${row.image}`}
          className="rounded-circle me-2"
          width="35"
          height="35"
        />
      ),
      width: "25%",
      sortable: true,
    },
    {
      name: "Actions",
      width: "20%",
      sortable: true,
      cell: (row) => (
        <div className="row float-end">
          <div className="col-3 ">
            <button
              type="button"
              className=" btn text-primary me-2"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasUpdate"
              aria-controls="offcanvasUpdate"
              title="Modifier article"
              onClick={() => handleUpdateButtonClick(row._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="edit-01">
                  <path
                    id="Icon"
                    d="M2.39662 15.0973C2.43491 14.7527 2.45405 14.5804 2.50618 14.4194C2.55243 14.2765 2.61778 14.1405 2.70045 14.0152C2.79363 13.8739 2.91621 13.7513 3.16136 13.5061L14.1666 2.5009C15.0871 1.58043 16.5795 1.58043 17.4999 2.5009C18.4204 3.42138 18.4204 4.91376 17.4999 5.83424L6.49469 16.8395C6.24954 17.0846 6.12696 17.2072 5.98566 17.3004C5.86029 17.383 5.72433 17.4484 5.58146 17.4946C5.42042 17.5468 5.24813 17.5659 4.90356 17.6042L2.08325 17.9176L2.39662 15.0973Z"
                    stroke="#475467"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
          <div className="col-3 ">
            <button
              type="button"
              className=" btn text-danger me-2 btn"
              data-toggle="tooltip"
              data-placement="top"
              title="Supprimer article"
              onClick={() => handleDeleteArticle(row._id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="trash-01">
                  <path
                    id="Icon"
                    d="M13.3333 4.99935V4.33268C13.3333 3.39926 13.3333 2.93255 13.1517 2.57603C12.9919 2.26243 12.7369 2.00746 12.4233 1.84767C12.0668 1.66602 11.6001 1.66602 10.6667 1.66602H9.33333C8.39991 1.66602 7.9332 1.66602 7.57668 1.84767C7.26308 2.00746 7.00811 2.26243 6.84832 2.57603C6.66667 2.93255 6.66667 3.39926 6.66667 4.33268V4.99935M8.33333 9.58268V13.7493M11.6667 9.58268V13.7493M2.5 4.99935H17.5M15.8333 4.99935V14.3327C15.8333 15.7328 15.8333 16.4329 15.5608 16.9677C15.3212 17.4381 14.9387 17.8205 14.4683 18.0602C13.9335 18.3327 13.2335 18.3327 11.8333 18.3327H8.16667C6.76654 18.3327 6.06647 18.3327 5.53169 18.0602C5.06129 17.8205 4.67883 17.4381 4.43915 16.9677C4.16667 16.4329 4.16667 15.7328 4.16667 14.3327V4.99935"
                    stroke="#475467"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [titleFilter, setTitleFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");

  const handleUpdateButtonClick = (id) => {
    setSelectedArticleId(id);
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, titleFilter, descriptionFilter]);

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
  const fetchData = async () => {
    try {
      const localStorageToken = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/articles/users/${user}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageToken}`,
          },
        }
      );

      const articlesData = await response.json();

      if (response.ok) {
        const filteredData = articlesData
          .filter((article) =>
            article.title.toLowerCase().includes(titleFilter.toLowerCase())
          )
          .filter((article) =>
            article.description
              .toLowerCase()
              .includes(descriptionFilter.toLowerCase())
          );

        setData(filteredData);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };
  const handleDeleteArticle = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/articles/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        swal({
          title: "Succès",
          text: "Article supprimé avec succès!",
          icon: "success",
          timer: 2500,
        });
      }
      fetchData();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article", error);
    }
  };
  return (
    <div className="margin-left">
      <div class="container">
        <div class="main-body">
          <div class="row gutters-sm mt-6">
            <div class="col-md-4 mb-3">
              <div class="card mt-4">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                    {userInfo?.avatar ? (
                      <img
                        src={`http://localhost:5000/${userInfo?.avatar}`}
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                    ) : (
                      <img
                        src="/5034901-200.png"
                        alt="Admin"
                        className="rounded-circle"
                        width="150"
                      />
                    )}
                    <div class="mt-3">
                      <h4>
                        {userInfo?.name && userInfo?.name?.length > 20
                          ? userInfo?.name?.substring(0, 20) + "..."
                          : userInfo?.name}
                      </h4>
                      <p class="text-secondary mb-1">{userInfo?.job}</p>
                      <p class="text-muted font-size-sm">{userInfo?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <div class="card mb-3 mt-4">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Nom Complet</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{userInfo?.name}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">{userInfo?.email}</div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Téléphone</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {" "}
                      {userInfo?.phone ? (
                        userInfo.phone
                      ) : (
                        <span>Données non disponibles</span>
                      )}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-3">
                      <h6 class="mb-0">Adresse</h6>
                    </div>
                    <div class="col-sm-9 text-secondary">
                      {userInfo?.address}
                    </div>
                  </div>
                  <hr />
                  <div class="row">
                    <div class="col-sm-12">
                      <button
                        class="btn btn-dark "
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>

                  <div
                    class="offcanvas offcanvas-end"
                    tabindex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                  >
                    <div class="offcanvas-header">
                      <h5 class="offcanvas-title" id="offcanvasRightLabel">
                        Modifier informations
                      </h5>
                      <button
                        id="closeOffcanvasUpdate"
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="offcanvas-body">
                      <label
                        htmlFor="fileInput2"
                        className="d-flex justify-content-center"
                      >
                        <div className="mb-2">
                          {imageUploaded ? (
                            <img
                              src={imageUploaded}
                              alt="Uploaded"
                              className="imgUploaded"
                            />
                          ) : userInfo?.avatar ? (
                            <img
                              src={`http://localhost:5000/${userInfo.avatar}`}
                              alt="User Avatar"
                              className="pointer imgUploaded"
                            />
                          ) : (
                            <img
                              src="../input-pictures.png"
                              alt="Placeholder"
                              className="pointer"
                            />
                          )}
                        </div>
                      </label>
                      <input
                        type="file"
                        id="fileInput2"
                        name="profile_picture2"
                        className="d-none"
                        accept="image/png, image/gif, image/jpeg"
                        required
                        onChange={handleImageChangeUpdate}
                      />
                      <div class="flex-column">
                        <label>Nom complet * </label>
                      </div>
                      <div class="inputForm">
                        <input
                          type="text"
                          class="input"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="saisir votre nom complet"
                        />
                      </div>
                      {errors.name && (
                        <div className="error-message">{errors.name}</div>
                      )}
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
                          value={email}
                          class="input"
                          placeholder="saisir votre email"
                        />
                      </div>
                      {errors.email && (
                        <div className="error-message">{errors.email}</div>
                      )}
                      <div class="flex-column">
                        <label>Adresse * </label>
                      </div>
                      <div class="inputForm">
                        <input
                          type="text"
                          class="input"
                          onChange={(e) => setAddress(e.target.value)}
                          value={address}
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
                          value={job}
                          placeholder="saisir votre emploie"
                        />
                      </div>
                      <div class="flex-column">
                        <label>Téléphone </label>
                      </div>
                      <PhoneInput
                        placeholder="saisir votre  téléphone"
                        value={phone}
                        onChange={(value, country, event) =>
                          setPhone(
                            event.target.value ? event.target.value : value
                          )
                        }
                      />
                      <button
                        class="btn btn-dark "
                        type="button"
                        onClick={handleUpdateUserInfo}
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card  mt-4 ">
              <div class="card-body">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-sm-12 ">
                    <h4 className="fw-bold m-4">Mes articles</h4>
                  </div>
                </div>
                <div className="col-lg-3  col-sm-12 float-md-end fload-start">
                  <button
                    className="btn btn-primary  mb-2 ms-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasAdd"
                    aria-controls="offcanvasAdd"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M9.99935 10.8333V5.83333M7.49935 8.33333H12.4993M15.8327 17.5V6.5C15.8327 5.09987 15.8327 4.3998 15.5602 3.86502C15.3205 3.39462 14.9381 3.01217 14.4677 2.77248C13.9329 2.5 13.2328 2.5 11.8327 2.5H8.16602C6.76588 2.5 6.06582 2.5 5.53104 2.77248C5.06063 3.01217 4.67818 3.39462 4.4385 3.86502C4.16602 4.3998 4.16602 5.09987 4.16602 6.5V17.5L9.99935 14.1667L15.8327 17.5Z"
                        stroke="white"
                        stroke-width="1.66667"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="ms-2"> Ajouter un article</span>
                  </button>
                </div>
                <div className="row col-lg-8">
                  <div className="col-lg-5">
                    <input
                      placeholder="Filtrer par titre"
                      className="form-control inputFiltre my-3"
                      type="search"
                      value={titleFilter}
                      onChange={(e) => setTitleFilter(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-5">
                    <input
                      placeholder="Filtrer par description"
                      className="form-control inputFiltre my-3"
                      type="search"
                      value={descriptionFilter}
                      onChange={(e) => setDescriptionFilter(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <section className="section">
                <div className="row">
                  <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    customStyles={customStyles}
                    paginationComponentOptions={{ noRowsPerPage: true }}
                  />
                </div>
              </section>
              <CreateArticle fetchData={fetchData} />
              <UpdateArticle
                fetchData={fetchData}
                articleId={selectedArticleId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
