import SearchIcon from '@mui/icons-material/Search'
import GenericModal from '@/shared/GenericModal/GenericModal'
import SearchForm from '../SearchForm/SearchForm'
import { useState } from 'react'
import { SCButton } from './SearchModalGroup.styles'
import { SCCardContainer } from '@/styles'

function SearchModalGroup() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  }

  return (
   <>
    <SCButton onClick={() => setOpen(true)}><SearchIcon /></SCButton>
    <GenericModal open={open} handleClose={handleClose}>
      <SearchForm CardWrapper={SCCardContainer} handleClose={handleClose}/>
    </GenericModal>
   </>
  )
}

export default SearchModalGroup