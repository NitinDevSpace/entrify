import { Modal, message } from "antd";
import { deleteTheater } from "../../services/theaters";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteTheaterModal = ({
	isDeleteModalOpen,
	setIsDeleteModalOpen,
	selectedTheatre,
	setSelectedTheatre,
	getData,
}) => {
	const dispatch = useDispatch();
	const handleOK = async () => {
		try {
			dispatch(ShowLoading());
			const theatreId = selectedTheatre._id;
			const response = await deleteTheater(theatreId);
			if (response.success) {
				message.success(response.message);
				getData();
			} else {
				message.error(response.message);
			}
			setSelectedTheatre(null);
			setIsDeleteModalOpen(false);
			dispatch(HideLoading());
		} catch (err) {
			message.error(err.message);
			dispatch(HideLoading());
			setIsDeleteModalOpen(false);
		}
	};

	const handleCancel = () => {
		setIsDeleteModalOpen(false);
		setSelectedTheatre(null);
	};
	return (
		<Modal
			centered
			title="Delete Theatre"
			open={isDeleteModalOpen}
			onCancel={handleCancel}
			onOk={handleOK}
		>
			<p className="pt-3 fs-18">
				Are you sure you want to delete this theatre?
			</p>
			<p className="pb-3 fs-18">
				This action can't be undone and you'll lose this theatre data.
			</p>{" "}
		</Modal>
	);
};
export default DeleteTheaterModal;
