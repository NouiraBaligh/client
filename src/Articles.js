import { useEffect, useState } from "react";
import "./Login.css";
import CreateArticle from "./pages/articles/CreateArticle";
import moment from "moment";
import "moment/locale/fr";
function Articles() {
  moment.locale("fr");
  const [data, setData] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [descriptionFilter, setDescriptionFilter] = useState("");
  const [userFilter, setUserFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, [titleFilter, descriptionFilter, userFilter]); 

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/articles", {
        method: "GET",
      });

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
          )
          .filter((article) =>
            article?.user?.name.toLowerCase().includes(userFilter.toLowerCase())
          );

        setData(filteredData);
      }
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  };

  return (
    <>
      <div className="margin-left">
        <div class="container">
          <div class="main-body">
            <div class="row gutters-sm me-3">
              <div class="card  mt-4 ">
                <div class="card-body">
                  <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-12 ">
                      <h4 className="fw-bold m-4">Liste des articles</h4>
                    </div>
                  </div>
                  <div className="col-lg-3 col-sm-12 float-md-end fload-start">
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
                    <div className="col-lg-4">
                      <input
                        placeholder="Filtrer par titre"
                        className="form-control inputFiltre my-3"
                        type="search"
                        value={titleFilter}
                        onChange={(e) => setTitleFilter(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4">
                      <input
                        placeholder="Filtrer par description"
                        className="form-control inputFiltre my-3"
                        type="search"
                        value={descriptionFilter}
                        onChange={(e) => setDescriptionFilter(e.target.value)}
                      />
                    </div>
                    <div className="col-lg-4">
                      <input
                        placeholder="Publié par "
                        className="form-control inputFiltre my-3"
                        type="search"
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <section className="section">
                  <div className="row"></div>
                </section>
                {data.map((item, index) => (
                  <article class="postcard dark blue">
                    <a class="postcard__img_link" href="#">
                      <img
                        class="postcard__img"
                        src={`http://localhost:5000/${item.image}`}
                        alt="Image Title"
                      />
                    </a>
                    <div class="postcard__text">
                      <h1 class="postcard__title blue ms-3">{item.title}</h1>
                      <span className="ms-3">
                        Publié par
                        <span className="ms-2">{item?.user?.name} </span>
                      </span>
                      <div class="postcard__bar ms-3"></div>
                      <div class="postcard__subtitle small ">
                        <time
                          dateTime={moment(item.createdAt).format()}
                          class="ms-2"
                        >
                          <i class="fas fa-calendar-alt mr-2 ms-2"></i>{" "}
                          <span className="me-1"></span>
                          {moment(item.createdAt).fromNow()}
                        </time>
                      </div>
                      <div class="postcard__preview-txt ms-3 mt-4">
                        {item.description}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateArticle fetchData={fetchData} />
    </>
  );
}

export default Articles;
