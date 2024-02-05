import { useNavigation } from 'react-router-dom'

const useNavigationIsSubmitting = () => useNavigation().state === 'submitting'

export default useNavigationIsSubmitting
