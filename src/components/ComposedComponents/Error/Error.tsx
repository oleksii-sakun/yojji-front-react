import './styles.css';
import {handleClearLocalStorage} from '../../../utils';

export const Error = ({error}: any):JSX.Element=> {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center ">{error.response.status}</h1>
              </div>
              <div className="content_box_404">
                <h3 className="h2">
                  {error.response.data.message}
                </h3>
                {error.response.status === 401 && (
                  <a href="/" className="link_404" onClick={handleClearLocalStorage}>Go to Login page</a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};
