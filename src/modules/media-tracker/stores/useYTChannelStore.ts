import {defineStore} from 'pinia'
import type {Ref} from 'vue'
import {ref} from 'vue'
import {api} from '@/services/api.ts'
import type {YTChannel} from '@media-tracker/models'
import type {ApiResponse, GetAllParams} from '@/types'
import {mediaTrackerEndpoints} from '@media-tracker/constants'

/**
 * useYTChannelStore
 *
 * A Pinia store for managing YouTube channels in the Media Tracker module.
 * Provides reactive state and CRUD actions to interact with the backend API.
 *
 * Features:
 * - Reactive state for channels, loading status, and error messages.
 * - Fetch all channels, fetch by ID, create, update, and delete channels.
 * - Handles API requests using a shared `api` service.
 * - Updates the reactive `channels` array automatically after create, update, or delete operations.
 *
 * State:
 * - `channels` (Ref<YTChannel[]>): The list of YouTube channels.
 * - `loading` (Ref<boolean>): Indicates if an API request is in progress.
 * - `error` (Ref<string | null>): Stores the latest error message, if any.
 *
 * Actions:
 * - `getAll(params?: GetAllParams)`: Fetches all channels from the backend. Optional query parameters can be provided.
 * - `getById(id: string)`: Fetches a single channel by its ID. Returns the channel or null if not found or on error.
 * - `create(channel: Partial<YTChannel>)`: Creates a new channel. Returns the created channel or null on error.
 * - `update(id: string, payload: Partial<YTChannel>)`: Updates an existing channel. Updates the local state and returns the updated channel or null on error.
 * - `remove(id: string)`: Deletes a channel by ID. Updates the local state and returns true on success, false on error.
 *
 * Example usage:
 * ```ts
 * import { useYTChannelStore } from '@media-tracker/stores/useYTChannelStore'
 *
 * const channelStore = useYTChannelStore()
 *
 * // Fetch all channels
 * await channelStore.getAll()
 *
 * // Create a new channel
 * const newChannel = await channelStore.create({ name: 'My Channel', url: 'https://youtube.com/...'})
 *
 * // Update a channel
 * const updated = await channelStore.update(newChannel.id, { name: 'Updated Channel Name' })
 *
 * // Delete a channel
 * await channelStore.remove(updated.id)
 * ```
 *
 * Notes:
 * - All API errors are caught and stored in `error` for display in the UI.
 * - The store uses `mediaTrackerEndpoints` to determine the correct backend URLs.
 * - State is reactive and can be directly used in Vue components with `ref`/`computed`.
 */
export const useYTChannelStore = defineStore('channel', () => {
    const channels: Ref<YTChannel[]> = ref<YTChannel[]>([])
    const loading: Ref<boolean> = ref<boolean>(false)
    const error: Ref<string | null> = ref<string | null>(null)

    /** Fetch all channels */
    async function getAll(params?: GetAllParams): Promise<ApiResponse<YTChannel[]>> {
        loading.value = true
        error.value = null

        try {
            const response = await api.get<YTChannel[]>(
                mediaTrackerEndpoints.v1.youTube.channels,
                { params }
            )
            channels.value = response.data
            return { data: response.data, status: response.status }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch channels'
            return { data: [], status: err.response?.status ?? null }
        } finally {
            loading.value = false
        }
    }

    /** Fetch a channel by ID */
    async function getById(id: string): Promise<ApiResponse<YTChannel>> {
        try {
            const response = await api.get<YTChannel>(
                `${mediaTrackerEndpoints.v1.youTube.channels}${id}`
            )
            return { data: response.data, status: response.status }
        } catch (err: any) {
            error.value = err.message || 'Failed to fetch channel'
            return { data: null, status: err.response?.status ?? null }
        }
    }

    /** Create a new channel */
    async function create(channel: Partial<YTChannel>): Promise<ApiResponse<YTChannel>> {
        try {
            const response = await api.post<YTChannel>(
                mediaTrackerEndpoints.v1.youTube.channels,
                channel
            )
            channels.value.push(response.data)
            return {
                data: response.data,
                status: response.status
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to create channel'
            return {
                data: null,
                status: err.response?.status ?? null
            }
        }
    }

    /** Update a channel */
    async function update(id: string, payload: Partial<YTChannel>): Promise<ApiResponse<YTChannel>> {
        try {
            const response = await api.put<YTChannel>(
                `${mediaTrackerEndpoints.v1.youTube.channels}${id}`,
                payload
            )

            const index: number = channels.value.findIndex(c => c.id === id)
            if (index !== -1) channels.value[index] = response.data

            return {
                data: response.data,
                status: response.status
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to update channel'
            return {
                data: null,
                status: err.response?.status ?? null
            }
        }
    }

    /** Delete a channel */
    async function remove(id: string): Promise<ApiResponse<null>> {
        try {
            const response = await api.delete(
                `${mediaTrackerEndpoints.v1.youTube.channels}${id}`
            )

            channels.value = channels.value.filter(c => c.id !== id)

            return {
                data: null,
                status: response.status
            }
        } catch (err: any) {
            error.value = err.message || 'Failed to delete channel'
            return {
                data: null,
                status: err.response?.status ?? null
            }
        }
    }

    return {
        channels,
        loading,
        error,
        getAll,
        getById,
        create,
        update,
        remove
    }
})