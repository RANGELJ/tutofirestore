import { type LoaderFunction, useLoaderData } from 'react-router-dom'

const usePageLoaderData = <LoaderType extends LoaderFunction>() => useLoaderData() as Awaited<ReturnType<LoaderType>>

export default usePageLoaderData
