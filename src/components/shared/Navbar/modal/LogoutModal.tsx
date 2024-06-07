const LogoutModal = ({closeModal}: {closeModal: () => void}) => {
    return (
        <div className={"p-20"}>
            LogoutModal
            <button onClick={closeModal}>CLOSE</button>
        </div>
    );
};

export default LogoutModal;