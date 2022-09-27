import React, {useEffect, useState} from 'react';
import './index.css';

function App() {
  
  return (
    <div className="Container">
        <div className="PanelPdv">
            <div className='PanelLeft'>
              <div className='Fields'>
                  <div className='Logo'><div className='Image'></div></div>
                  <div className='Form'>
                      <div className='row'>
                          <div className='Group G-6'>
                              <label for='product_code'>código</label>
                              <input itemID='product_code' placeholder='' ></input>
                          </div>
                          <div className='Group G-6'>
                              <label className='' for=''>Teste</label>
                              <input className='' itemID='' placeholder='' ></input>
                          </div>
                      </div>
                      <div className='row'>
                          <div className='Group G-12'>
                              <label for='product_description'>descrição</label>
                              <input itemID='product_description' placeholder='' ></input>
                          </div>
                      </div>
                      <div className='row'>
                          <div className='Group G-3'>
                              <label for='product_quantity'>quantidade</label>
                              <input itemID='product_quantity' placeholder='' ></input>
                          </div>
                          <div className='Group G-3'>
                              <label for='product_unity'>unidade</label>
                              <input itemID='product_unity' placeholder='' ></input>
                          </div>
                          <div className='Group G-3'>
                              <label for='product_stock'>estoque</label>
                              <input itemID='product_stock' placeholder='' ></input>
                          </div>
                      </div>
                      <div className='row'>
                          <div className='Group G-6'>
                              <label for='product_unity_value'>valor unitário</label>
                              <input itemID='product_unity_value' placeholder='' ></input>
                          </div>
                          <div className='Group G-6'>
                              <label for='balance_value'>valor total</label>
                              <div className='balanceValue'>R$ 36,54</div>
                          </div>
                      </div>
                      <div className='row'>
                          <div className='Group G-6'>
                              <div className='ProductImage'></div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='Shortcuts'>
                  <button className='BtnShortcuts'>F1</button>
                  <button className='BtnShortcuts'>F2</button>
                  <button className='BtnShortcuts'>F3</button>
                  <button className='BtnShortcuts'>F4</button>
                  <button className='BtnShortcuts'>F5</button>
                  <button className='BtnShortcuts'>F6</button>
                  <button className='BtnShortcuts'>F7</button>
                  <button className='BtnShortcuts'>F8</button>
              </div>
              <div className='CompanyInfo'>
                <div className='CompanyImage'></div>
                <div className='CompanyName'>01 - MATRIZ</div>
              </div>
            </div>
            <div className='PanelRight'>

            </div>
        </div>
    </div>
  );
}

export default App;
