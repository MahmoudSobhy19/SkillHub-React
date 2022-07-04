import { FaUser } from 'react-icons/fa';

const Navbar = () => {
  return ( 
    <nav className="bg-gray-600">
      <div className="container mx-auto px-10 h-12 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center mr-6">
            <h1 className="text-white text-2xl font-bold">
              SkillHub
            </h1>
            <span className="w-4 h-6 ml-1 bg-green-600 block"></span>
          </div>

          <div>
            <ul className="flex items-center gap-3 text-sm font-bold text-white">
              <li className="border-green-600 border-b-4 pt-3.5 pb-2.5">Practice</li>
              <li>Contests</li>
              <li>Road Maps</li>
              <li>Leader Board</li>
            </ul>
          </div>
        </div>

        <div className='flex items-center gap-2 text-white'>
          <FaUser className='text-xl'/>
          <div>Developer</div>
        </div>

      </div>
    </nav>
  );
}
 
export default Navbar;