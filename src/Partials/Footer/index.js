import React from "react";

const Footer = props => (
    <div className="page-footer bg-dark pt-4 border-top border-secondary">
        <div className="container-fluid text-center text-md-left">
            <div className="row">
                <div className="col-md-6 mt-md-0 mt-3 mb-3">
                    <h5 className="text-light">Disco Mosh Pit</h5>
                    <p><small className="text-light">Thanks for visiting!</small></p>
                    <small className="text-light">This is a <a className="text-info" href="http://www.ryangelow.com">RyanGelow</a> production.</small>
                </div>
            </div>
        </div>
    </div>
);

export default Footer;
