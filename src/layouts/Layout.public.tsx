import { Outlet } from 'react-router-dom';


const LayoutPublic = () => {
	return (
		<div>
			<Outlet />
			<div className='text-center py-2 mb-10 bg-gray-900  shadow-gray-700 shadow-xl '>
				<p className=' text-white font-bold text-lg  '>
					Jaider Ruiz {new Date().getFullYear()}
				</p>
			</div>
		</div>
	);
};

export default LayoutPublic;