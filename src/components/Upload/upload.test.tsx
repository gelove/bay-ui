// import '@testing-library/jest-dom/extend-expect'
import React, { MouseEventHandler } from 'react'
import axios from 'axios'
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
  createEvent,
} from '@testing-library/react'

import { Upload, UploadProps } from './upload'

jest.mock('../Icon/icon', () => {
  return ({
    icon,
    onClick,
  }: {
    icon: HTMLElement
    onClick: MouseEventHandler<HTMLElement>
  }) => {
    return <span onClick={onClick}>{icon}</span>
  }
})

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

const testProps: UploadProps = {
  action: 'fake-url.com',
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['xyz'], 'test.png', { type: 'image/png' })
describe('test upload component', () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
    fileInput = wrapper.container.querySelector(
      '.allen-file-input'
    ) as HTMLInputElement
    // const fileInputTemp = wrapper.container.querySelector('.allen-file-input')
    // expect(fileInputTemp).not.toBeNull()
    // fileInput = fileInputTemp as HTMLInputElement

    uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
    // const uploadAreaTemp = wrapper.queryByText('Click to upload')
    // expect(uploadAreaTemp).not.toBeNull()
    // uploadArea = uploadAreaTemp as HTMLElement
  })
  it('upload process should works fine', async () => {
    const { queryByText } = wrapper
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({'data': 'cool'})
    // })
    mockedAxios.post.mockResolvedValue({ data: 'cool' })
    expect(uploadArea).toBeInTheDocument()
    expect(fileInput).not.toBeVisible()
    fireEvent.change(fileInput, { target: { files: [testFile] } })
    expect(queryByText('spinner')).toBeInTheDocument()
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
    })
    expect(queryByText('check-circle')).toBeInTheDocument()
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
    expect(testProps.onChange).toHaveBeenCalledWith(testFile)

    //remove the uploaded file
    let timesEl = queryByText('times')
    expect(timesEl).not.toBeNull()
    expect(timesEl).toBeInTheDocument()
    timesEl = timesEl as HTMLElement
    fireEvent.click(timesEl)
    expect(queryByText('test.png')).not.toBeInTheDocument()
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: 'success',
        name: 'test.png',
      })
    )
  })
  it('drag and drop files should works fine', async () => {
    fireEvent.dragOver(uploadArea)
    expect(uploadArea).toHaveClass('is-drag-over')
    fireEvent.dragLeave(uploadArea)
    expect(uploadArea).not.toHaveClass('is-drag-over')
    const mockDropEvent = createEvent.drop(uploadArea)
    Object.defineProperty(mockDropEvent, 'dataTransfer', {
      value: {
        files: [testFile],
      },
    })
    fireEvent(uploadArea, mockDropEvent)

    await waitFor(() => {
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
  })
})
