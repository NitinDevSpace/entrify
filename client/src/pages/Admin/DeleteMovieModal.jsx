import { Modal } from "antd";
import { deleteMovie } from "../../services/movies";
import { ShowLoading, HideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";

const DeleteMovieModal = ({
	isDeleteModalOpen,
	setIsDeleteModalOpen,
	selectedMovie,
	setSelectedMovie,
	getData,
    messageApi,
}) => {
    const dispatch = useDispatch();
	const handleOK = async () => {
		try {
			dispatch(ShowLoading());
			const movieId = selectedMovie._id;
			const response = await deleteMovie({ movieId });
			if (response.success) {
				messageApi.open({
					type: "success",
					content: response.message,
				});
				getData();
			} else {
				messageApi.open({
					type: "error",
					content: response.message,
				});
			}
			setSelectedMovie(null);
			setIsDeleteModalOpen(false);
			dispatch(HideLoading());
		} catch (err) {
			messageApi.open({
				type: "error",
				content: err.message,
			});
			dispatch(HideLoading());
			setIsDeleteModalOpen(false);
		}
	};

	const handleCancel = () => {
		setIsDeleteModalOpen(false);
		setSelectedMovie(null);
	};
	return (
		<Modal
			centered
			title="Delete Movie"
			open={isDeleteModalOpen}
			onCancel={handleCancel}
			onOk={handleOK}
        >
			Are you sure you want to delete this movie?
		</Modal>
	);
};
export default DeleteMovieModal;
