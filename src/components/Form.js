import React from "react";

import "./Form.css";

const Form = () => {
    return (
        <div className="form">
            <div className="content">
                <div className="logo">
                    <div className="image"></div>
                </div>
                <div className="row">
                    <div className="Group G-6 padding-right-5">
                        <label>código</label>
                        <input disabled></input>
                    </div>
                    <div className="Group G-6  padding-left-5">
                        <label>Teste</label>
                        <input disabled></input>
                    </div>
                </div>
                <div className="row">
                    <div className="Group G-12">
                        <label>descrição</label>
                        <input disabled></input>
                    </div>
                </div>
                <div className="row">
                    <div className="Group G-4 padding-right-5">
                        <label>quantidade</label>
                        <input disabled></input>
                    </div>
                    <div className="Group G-4 padding-5">
                        <label>unidade</label>
                        <input disabled></input>
                    </div>
                    <div className="Group G-4 padding-left-5">
                        <label>estoque</label>
                        <input disabled></input>
                    </div>
                </div>
                <div className="row">
                    <div className="Group G-6 padding-right-5">
                        <label>valor unitário</label>
                        <input disabled></input>
                    </div>
                    <div className="Group G-6 padding-left-5">
                        <label>valor total</label>
                        <div className="total-value"></div>
                    </div>
                </div>
                <div className="row">
                    <div className="Group G-12">
                        <div className="product-image"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;