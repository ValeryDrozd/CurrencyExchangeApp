import styled from "styled-components";

const Spinner = () => {
  return (
    <SpinnerView>
      <SpinnerDoubleRing>
        <div></div>
        <div></div>
      </SpinnerDoubleRing>
    </SpinnerView>
  );
};

const SpinnerView = styled.div`
  margin: 0 auto;
  width: 154px !important;
  height: 154px !important;
  transform: translate(-77px, -77px) scale(0.8) translate(77px, 77px);
`;

const SpinnerDoubleRing = styled.div`
  position: relative;
  & div {
    position: absolute;
    width: 160px;
    height: 160px;
    top: 20px;
    left: 20px;
    border-radius: 50%;
    border: 8px solid #000;
    @keyframes lds-double-ring {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
      }
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    border-color: #f9db31 transparent #f9db31 transparent;
    -webkit-animation: lds-double-ring 1.5s linear infinite;
    animation: lds-double-ring 1.5s linear infinite;
  }
  & div:nth-child(2) {
    width: 140px;
    height: 140px;
    top: 30px;
    left: 30px;
    @keyframes lds-double-ring_reverse {
      0% {
        -webkit-transform: rotate(0);
        transform: rotate(0);
      }
      100% {
        -webkit-transform: rotate(-360deg);
        transform: rotate(-360deg);
      }
    }

    border-color: transparent #a5ff3d transparent #a5ff3d;
    -webkit-animation: lds-double-ring_reverse 1.5s linear infinite;
    animation: lds-double-ring_reverse 1.5s linear infinite;
  }
`;

export default Spinner;
