import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { TextField, Modal, Autocomplete } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios'
import DashboardChart from '../components/DashboardChart';
import DashboardLineChart from '../components/DashboardLineChart';
import PieChartComponent from '../components/PieChartComponent';


function Home() {
    const navigate = useNavigate()
    const [budget, setBudget] = useState([])
    const [addModal, setAddModal] = useState(false)
    const [addModalData, setAddModalData] = useState({
        name: '',
        amount: 0,
        category: '',
        date: '',
    })
    const [updateModal, setUpdateModal] = useState(false)
    const [updateData, setUpdateData] = useState({
        _id: '',
        name: '',
        amount: 0,
        category: '',
        date: '',
    })
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [chartData, setChartData] = useState([])
    const [pieChartData, setPieChartData] = useState([])
    const [year, setYear] = useState(new Date().getFullYear())
    const [closeModal, setCloseModal] = useState(false)

    const categoryOptions = [
        { value: "", label: "Select Category" },
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Bills', label: 'Bills' },
        { value: 'Rent', label: 'Rent' },
        { value: 'Salary', label: 'Salary' },
        { value: 'Food', label: 'Food' },
        { value: 'Travel', label: 'Travel' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Others', label: 'Others' },
    ]

    const add = async () => {
        if (addModalData.name === '' || addModalData.amount === 0 || addModalData.category === '' || addModalData.date === '') {
            toast.error('Please fill all the fields!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            setLoading(true)
            await Axios.post('https://moneydiet.onrender.com/budget/create-budget',
                addModalData,
                {
                    headers: {
                        authorization: localStorage.getItem('budget-token'),
                    },
                }
            ).then(({ data }) => {
                setLoading(false)
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setAddModal(false)
                setAddModalData({
                    name: '',
                    amount: 0,
                    category: '',
                    date: '',
                })

            }
            ).catch((err) => {
                setLoading(false)
                toast.error(err.response.data.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

        }
    }

    const update = async () => {
        if (updateData.name === '' || updateData.amount === 0 || updateData.category === '' || updateData.date === '') {
            toast.error('Please fill all the fields!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            setLoading(true)
            await Axios.put(`https://moneydiet.onrender.com/budget/update-budget/${updateData._id}`,
                updateData,
                {
                    headers: {
                        authorization: localStorage.getItem('budget-token'),
                    },
                }
            ).then(({ data }) => {
                setLoading(false)
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setUpdateModal(false)
                setUpdateData({
                    _id: '',
                    name: '',
                    amount: 0,
                    category: '',
                    date: '',
                })

            }
            ).catch((err) => {
                setLoading(false)
                toast.error(err.response.data.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

        }
    }

    const deleteBudget = async (id) => {
        await Axios.delete(`https://moneydiet.onrender.com/budget/delete-budget/${id}`, {
            headers: {
                authorization: localStorage.getItem('budget-token'),
            },
        }).then(({ data }) => {
            toast.success(data.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch((err) => {
            toast.error(err.response.data.error, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })
    }

    useEffect(() => {
        if (!localStorage.getItem('budget-token')) {
            navigate('/login')
        }
    }, [])

    const getAllBudgets = () => {
        Axios.get('https://moneydiet.onrender.com/budget/get-budgets', {
            headers: {
                authorization: localStorage.getItem('budget-token'),
            },
        }).then(({ data }) => {
            setBudget(data.budgets)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getChartData = () => {
        Axios.get('https://moneydiet.onrender.com/budget/get-net-by-month/' + year, {
            headers: {
                authorization: localStorage.getItem('budget-token'),
            },
        }).then(({ data }) => {
            setChartData(data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getChartDataByCategory = () => {
        Axios.get('https://moneydiet.onrender.com/budget/get-net-by-category', {
            headers: {
                authorization: localStorage.getItem('budget-token'),
            },
        }).then(({ data }) => {
            if (data.status === 200) {
                console.log(data.data)
                setPieChartData(data.data)
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAllBudgets()
        getChartData()
        getChartDataByCategory()
    }, [])

    const columns = [
        {
            name: 'Expense Name',
            selector: (row) => row.name,
        },
        {
            name: 'Amount',
            selector: (row) => (row.amount),
            sortable: true,
        },
        {
            name: 'Debit / Credit',
            cell: (row) => (
                <div>
                    {row.amount < 0 ? (
                        <span className='text-danger'><b>Debit</b></span>
                    ) : (
                        <span className='text-success'><b>Credit</b></span>
                    )}
                </div>
            ),
        },
        {
            name: 'Category',
            selector: (row) => row.category,
        },
        {
            name: 'Date',
            selector: (row) => {
                const date = new Date(row.date)
                return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
            },
            sortable: true,
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button
                        className='btn btn-sm btn-warning'
                        onClick={() => {
                            setUpdateModal(true)
                            setUpdateData(row)
                        }}
                    >
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>{' '}
                    <button
                        className='btn btn-sm btn-danger'
                        onClick={() => {
                            deleteBudget(row._id)
                        }}
                    >
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            ),
        }
    ]

    // Write code to show a modal on 10 second of inactivity
    const updateExpireTime = () => {
        const expireTime = new Date().getTime() + 10000
        localStorage.setItem('expire-time', expireTime)
    }

    const checkForInactivity = () => {
        const currentTime = new Date().getTime()
        const expireTime = localStorage.getItem('expire-time')
        if (currentTime > expireTime) {
            setCloseModal(true)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            checkForInactivity()
        }, 10000)

        return () => {
            clearInterval(interval)
        }
    }, [])


    useEffect(() => {
        updateExpireTime()
        window.addEventListener('mousemove', updateExpireTime)
        window.addEventListener('scroll', updateExpireTime)
        window.addEventListener('keypress', updateExpireTime)
        window.addEventListener('click', updateExpireTime)
        window.addEventListener('load', updateExpireTime)
        window.addEventListener('touchstart', updateExpireTime)
        window.addEventListener('touchmove', updateExpireTime)
        window.addEventListener('touchend', updateExpireTime)
        window.addEventListener('touchcancel', updateExpireTime)

        return () => {
            window.removeEventListener('mousemove', updateExpireTime)
            window.removeEventListener('scroll', updateExpireTime)
            window.removeEventListener('keypress', updateExpireTime)
            window.removeEventListener('click', updateExpireTime)
            window.removeEventListener('load', updateExpireTime)
            window.removeEventListener('touchstart', updateExpireTime)
            window.removeEventListener('touchmove', updateExpireTime)
            window.removeEventListener('touchend', updateExpireTime)
            window.removeEventListener('touchcancel', updateExpireTime)
        }

    }, [])


    return (
        <>
            <div className='logout-btn'>
                <button className='btn btn-danger' onClick={() => {
                    localStorage.removeItem('budget-token')
                    navigate('/login')
                }}>
                    <i class="fa-solid fa-sign-out"></i> Logout
                </button>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
            <div className="container">
                <h1 className='mt-5 home-heading'>Budget Tracker</h1>
                <div className="row">
                    <div className="col-md-4">
                        <DashboardChart data={chartData} />
                    </div>
                    <div className="col-md-4">
                        <DashboardLineChart data={chartData} />
                    </div>
                    <div className="col-md-4">
                        <PieChartComponent data={pieChartData} />
                    </div>
                </div>
            </div>
            <div className='container'>

                <DataTable
                    columns={columns}
                    data={budget.filter((item) => {
                        if (search === '') {
                            return item
                        } else if (
                            item.name.toLowerCase().includes(search.toLowerCase())
                        ) {
                            return item
                        }
                    })}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight='100%'
                    highlightOnHover
                    striped
                    responsive
                    actions={
                        <>
                            <div className='btn btn-success' onClick={() => setAddModal(true)}>
                                <i class="fa-solid fa-money-bill"></i> Add
                            </div>
                        </>
                    }
                    subHeader
                    subHeaderComponent={
                        <TextField
                            id='outlined-basic'
                            label='Search'
                            variant='outlined'
                            className='input w-100'
                            size='small'
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    }
                    subHeaderAlign='left'
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                />
            </div>
            <Modal
                open={addModal}
                onClose={() => setAddModal(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <div className='card mt-5'>
                                <div className='card-header'>
                                    <h3>Add Budget</h3>
                                </div>
                                <div className='card-body'>
                                    <div>
                                        <div className='form-group'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Expense Name"
                                                variant="outlined"
                                                className='w-100'
                                                size='small'
                                                value={addModalData.name}
                                                onChange={(e) =>
                                                    setAddModalData({
                                                        ...addModalData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Amount"
                                                variant="outlined"
                                                type='number'
                                                className='w-100 mt-3'
                                                size='small'
                                                value={addModalData.amount}
                                                onChange={(e) =>
                                                    setAddModalData({
                                                        ...addModalData,
                                                        amount: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <Autocomplete
                                                id="combo-box-demo"
                                                options={categoryOptions}
                                                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                                                defaultValue={addModalData.category}
                                                onChange={(e, data) => {
                                                    setAddModalData({
                                                        ...addModalData,
                                                        category: data.value,
                                                    })
                                                }}
                                                required
                                                className='w-100 mt-3'
                                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Date"
                                                variant="outlined"
                                                type='date'
                                                className='w-100 mt-3'
                                                size='small'
                                                value={addModalData.date ? addModalData.date : ''}
                                                onChange={(e) =>
                                                    setAddModalData({
                                                        ...addModalData,
                                                        date: e.target.value,
                                                    })
                                                }
                                                required
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </div>
                                        <button type='submit' className='btn btn-success mt-2' onClick={() => add()} disabled={loading}>
                                            {
                                                loading ? <div class="spinner-border text-light" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div> : 'Add'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
            <Modal
                open={updateModal}
                onClose={() => setUpdateModal(false)}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <div className='card mt-5'>
                                <div className='card-header'>
                                    <h3>Edit Budget</h3>
                                </div>
                                <div className='card-body'>
                                    <div>
                                        <div className='form-group'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Expense Name"
                                                variant="outlined"
                                                className='w-100'
                                                size='small'
                                                value={updateData.name}
                                                onChange={(e) =>
                                                    setUpdateData({
                                                        ...updateData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Amount"
                                                variant="outlined"
                                                className='w-100 mt-3'
                                                size='small'
                                                type='number'
                                                value={updateData.amount}
                                                onChange={(e) =>
                                                    setUpdateData({
                                                        ...updateData,
                                                        amount: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <Autocomplete
                                                id="combo-box-demo"
                                                options={categoryOptions}
                                                renderInput={(params) => <TextField {...params} label="Category" variant="outlined" />}
                                                defaultValue={updateData.category}
                                                onChange={(e, data) => {
                                                    setUpdateData({
                                                        ...addModalData,
                                                        category: data.value,
                                                    })
                                                }}
                                                required
                                                className='w-100 mt-3'
                                                isOptionEqualToValue={(option, value) => option.label === value.label}
                                            />
                                        </div>
                                        <div className='form-group'>
                                            <TextField
                                                id="outlined-basic"
                                                label="Date"
                                                variant="outlined"
                                                type='date'
                                                className='w-100 mt-3'
                                                size='small'
                                                value={updateData.date ? updateData.date : ''}
                                                onChange={(e) =>
                                                    setUpdateData({
                                                        ...updateData,
                                                        date: e.target.value,
                                                    })
                                                }
                                                required
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </div>
                                        <button type='submit' className='btn btn-success mt-2' onClick={() => update()} disabled={loading}>
                                            {
                                                loading ? <div class="spinner-border text-light" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div> : 'Update'
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                open={closeModal}
                onClose={() => {
                    localStorage.removeItem('budget-token')
                    navigate('/login')
                }}
                aria-labelledby='modal-modal-title'
                aria-describedby='modal-modal-description'
            >
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 offset-md-3'>
                            <div className='card mt-5'>
                                <div className='card-header'>
                                    <h3>Session Expired</h3>
                                </div>
                                <div className='card-body'>
                                    <div>
                                        <h5>Your session has been expired due to inactivity. Please login again to continue.</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Home
