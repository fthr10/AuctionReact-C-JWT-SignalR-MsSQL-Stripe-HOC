import React, { useEffect, useState } from 'react';
import { vehicleModel } from '../../Interfaces/vehicleModel';
import './Styles/VehicleList.css';
import Circle from './Circle';
import { Link } from 'react-router-dom';
import { useGetVehiclesQuery } from '../../Api/vehicleApi';
import Banner from './Banner';
import { SD_FilterTypes } from '../../Interfaces/enums/SD_FilterTypes';
import { Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../Storage/store';

function VehicleList() {
  const { data, isLoading } = useGetVehiclesQuery(null);
  const [filterResponse, setFilterResponse] = useState<vehicleModel[]>([]);
  const [vehicles, setVehicleState] = useState<vehicleModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0); // Default page is 0
  const [itemsPerPage] = useState(8); // Sayfa başına 8 araç gösterilecek
  const searchElement: string = useSelector((state: RootState) => state.vehicleStore.search);

  const filterOptions: Array<SD_FilterTypes> = [
    SD_FilterTypes.NAME_A_Z,
    SD_FilterTypes.NAME_Z_A,
    SD_FilterTypes.PRICE_HİGH_LOW,
    SD_FilterTypes.PRICE_LOW_HİGH,
    SD_FilterTypes.RemoveFilter,
  ];

  const handlePaginationClick = (page: number) => {
    setCurrentPage(page);
    const startIndex = page * itemsPerPage;
    const paginatedVehicles = vehicles.slice(startIndex, startIndex + itemsPerPage);
    setFilterResponse(paginatedVehicles);
  };

  const handleFilterClick = (sortTypes: any) => {
    let sortedVehicles = [...vehicles];

    if (filterOptions[sortTypes] === SD_FilterTypes.PRICE_HİGH_LOW) {
      sortedVehicles.sort((a, b) => b.price - a.price);
    }
    if (filterOptions[sortTypes] === SD_FilterTypes.PRICE_LOW_HİGH) {
      sortedVehicles.sort((a, b) => a.price - b.price);
    }
    if (filterOptions[sortTypes] === SD_FilterTypes.NAME_A_Z) {
      sortedVehicles.sort((a, b) =>
        a.brandAndModel.toLowerCase().localeCompare(b.brandAndModel.toLowerCase())
      );
    }
    if (filterOptions[sortTypes] === SD_FilterTypes.NAME_Z_A) {
      sortedVehicles.sort((a, b) =>
        b.brandAndModel.toLowerCase().localeCompare(a.brandAndModel.toLowerCase())
      );
    }
    if (filterOptions[sortTypes] === SD_FilterTypes.RemoveFilter) {
      sortedVehicles = [...vehicles];
    }

    setFilterResponse(sortedVehicles.slice(0, itemsPerPage));
    setCurrentPage(0);
  };

  useEffect(() => {
    if (data) {
      
      setVehicleState(data.result);
      setFilterResponse(data.result.slice(0, itemsPerPage));
    }
  }, [data]);

  useEffect(() => {
    if (searchElement && vehicles) {
      const filteredVehicles = vehicles.filter((vehicle) =>
        vehicle.brandAndModel.toLowerCase().includes(searchElement.toLowerCase())
      );
      setFilterResponse(filteredVehicles.slice(0, itemsPerPage));
      setCurrentPage(0);
    }
  }, [searchElement, vehicles]);

  const pageCount = Math.ceil(vehicles.length / itemsPerPage);

  return (
    <div className='container'>
      <Banner />
      <div className='row'>
        <div className="dropdown mt-3">
          <button className='btn btn-secondary dropdown-toggle' type='button' data-bs-toggle="dropdown" aria-expanded="false">
            Filter
          </button>
          <ul className="dropdown-menu">
            {filterOptions.map((filterType, index) => (
              <li key={index}>
                <a className="dropdown-item" onClick={() => handleFilterClick(index)}>{filterType}</a>
              </li>
            ))}
          </ul>
        </div>

        {filterResponse.map((vehicle, index) => (
          <div className='col' key={index}>
            <div className='auction-card text-center'>
              <div className='card-image'>
                <img src={vehicle.image} alt={`${vehicle.brandAndModel}`} />
              </div>
              <div className='card-details'>
                <h2>{vehicle.brandAndModel}</h2>
                <p><strong>Year:</strong> {vehicle.manufacturingYear}</p>
                <p><strong>Color:</strong> {vehicle.color}</p>
                <p><strong>Current Bid:</strong> ${vehicle.price}</p>
                <p><strong>End Time:</strong> {vehicle.endTime}</p>
              </div>
              <div>
                <Link to={`Vehicle/VehicleId/${vehicle.vehicleId}`}>
                  <button className='btn btn-danger'>Detail</button>
                </Link>
              </div>
              <Circle vehicle={vehicle} />
            </div>
          </div>
        ))}
      </div>

      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => handlePaginationClick(currentPage - 1)}>Previous</a>
          </li>

          {[...Array(pageCount)].map((_, pageIndex) => (
            <li className={`page-item ${pageIndex === currentPage ? 'active' : ''}`} key={pageIndex}>
              <a className="page-link" onClick={() => handlePaginationClick(pageIndex)}>{pageIndex + 1}</a>
            </li>
          ))}

          <li className={`page-item ${currentPage === pageCount - 1 ? 'disabled' : ''}`}>
            <a className="page-link" onClick={() => handlePaginationClick(currentPage + 1)}>Next</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default VehicleList;
