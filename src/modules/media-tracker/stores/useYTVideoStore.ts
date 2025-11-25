import {defineStore} from 'pinia'
import {type Ref, ref} from 'vue'
import type {YTVideo} from '@media-tracker/models'
import type {ApiResponse, GetAllParams} from '@/types'
import {api} from '@/services/api.ts'
import {mediaTrackerEndpoints} from '@media-tracker/constants'

/**
 * Pinia store for managing YouTube videos within the Media Tracker application.
 * Provides actions for fetching, creating, updating, and deleting videos,
 * as well as reactive state for loading and error handling.
 *
 * @remarks
 * This store communicates with the backend API using the shared `api` service
 * and YouTube-related endpoints defined in `mediaTrackerEndpoints`.
 */
export const useYTVideoStore = defineStore('video', () => {
    /**
     * Reactive list of YouTube videos currently stored in the application state.
     */
    const videos: Ref<YTVideo[]> = ref<YTVideo[]>([])

    /**
     * Indicates whether an API request is currently in progress.
     */
    const loading: Ref<boolean> = ref<boolean>(false)

    /**
     * Stores the latest error message from failed API requests.
     * `null` means no error is present.
     */
    const error: Ref<string | null> = ref<string | null>(null)

    /**
     * Fetches all YouTube videos.
     *
     * @param params - Optional query parameters for filtering, sorting, or pagination.
     * @returns A promise resolving to an `ApiResponse` containing a list of videos.
     *
     * @example
     * ```ts
     * const { data } = await getAll({ page: 1, limit: 10 })
     * ```
     */
    async function getAll(params?: GetAllParams): Promise<ApiResponse<YTVideo[]>> {
        loading.value = true
        error.value = null

        try {
            const response = await api.get<YTVideo[]>(
                mediaTrackerEndpoints.v1.youTube.videos,
                { params }
            )
            videos.value = response.data
            return { data: response.data, status: response.status }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch videos'
            return { data: [], status: err.response?.status ?? null }
        } finally {
            loading.value = false
        }
    }

    /**
     * Fetches a single YouTube video by its ID.
     *
     * @param id - The ID of the video to fetch.
     * @returns A promise resolving to an `ApiResponse` containing the requested video.
     *
     * @example
     * ```ts
     * const { data } = await getById('abc123')
     * ```
     */
    async function getById(id: string): Promise<ApiResponse<YTVideo>> {
        try {
            const response = await api.get<YTVideo>(
                `${mediaTrackerEndpoints.v1.youTube.videos}${id}`
            )
            return { data: response.data, status: response.status }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch video'
            return { data: null, status: err.response?.status ?? null }
        }
    }

    /**
     * Creates a new YouTube video.
     *
     * @param video - A partial `YTVideo` object containing the data for the new video.
     * @returns A promise resolving to an `ApiResponse` containing the created video.
     *
     * @example
     * ```ts
     * await create({ title: 'New Video', url: 'https://youtube.com/...' })
     * ```
     */
    async function create(video: Partial<YTVideo>): Promise<ApiResponse<YTVideo>> {
        try {
            const response = await api.post<YTVideo>(
                mediaTrackerEndpoints.v1.youTube.videos,
                video
            )
            videos.value.push(response.data)
            return {
                data: response.data,
                status: response.status
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to create video'
            return {
                data: null,
                status: err.response?.status ?? null
            }
        }
    }

    /**
     * Updates an existing YouTube video by its ID.
     *
     * @param id - The ID of the video to update.
     * @param payload - A partial `YTVideo` containing fields to update.
     * @returns A promise resolving to an `ApiResponse` containing the updated video.
     *
     * @example
     * ```ts
     * await update('abc123', { title: 'Updated Title' })
     * ```
     */
    async function update(id: string, payload: Partial<YTVideo>): Promise<ApiResponse<YTVideo>> {
        try {
            const response = await api.put<YTVideo>(
                `${mediaTrackerEndpoints.v1.youTube.videos}${id}`,
                payload
            )

            const index: number = videos.value.findIndex(c => c.id === id)
            if (index !== -1) videos.value[index] = response.data

            return {
                data: response.data,
                status: response.status
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to update video'
            return {
                data: null,
                status: err.response?.status ?? null
            }
        }
    }

    /**
     * Deletes a YouTube video by its ID.
     *
     * @param id - The ID of the video to delete.
     * @returns A promise resolving to an `ApiResponse` indicating success or failure.
     *
     * @example
     * ```ts
     * await remove('abc123')
     * ```
     */
    async function remove(id: string): Promise<ApiResponse<null>> {
        try {
            const response = await api.delete(
                `${mediaTrackerEndpoints.v1.youTube.videos}${id}`
            )

            videos.value = videos.value.filter(c => c.id !== id)

            return {
                data: null,
                status: response.status
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to delete video'
            return {
                data: null,
                status: err.response?.status ?? null
            }
        }
    }

    return {
        videos,
        loading,
        error,
        getAll,
        getById,
        create,
        update,
        remove
    }
})