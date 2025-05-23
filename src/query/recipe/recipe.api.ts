import { ApiEndpoints } from '~/query/constants/api.ts';
import { ApiGroupNames } from '~/query/constants/api-group-names.ts';
import { EndpointNames } from '~/query/constants/endpoint-names.ts';
import { Tags } from '~/query/constants/tags.ts';
import { tokenApi } from '~/query/create-api.ts';
import { ApplicationState } from '~/store/configure-store';
import { recipe } from '~/store/recipe/recipe.types';
import { setExistResult, setIsLoadingQuery } from '~/store/recipe/recipe-filter-slice';

import {
    transformErrorResponse,
    transformRecipeProteinsResponse,
    transformRecipesProteinsResponse,
} from '../errors/transformErrors';
import { ResponseParamsOrNull, ResponseParamsWithId } from '../types';
import { DEFAULT_PARAMS } from './recipe.constants';
import { RecipesResponse } from './recipe.types';

export const recipesApiSlice = tokenApi
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPE],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<RecipesResponse, ResponseParamsOrNull>({
                query: (params = {}) => ({
                    url: ApiEndpoints.RECIPE,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPES,
                    params: {
                        ...DEFAULT_PARAMS,
                        ...params,
                    },
                }),
                async onQueryStarted(_, { dispatch, queryFulfilled, getState }) {
                    const state = getState() as ApplicationState;
                    const isFilter = state.recipeFilter?.isFilter;

                    if (isFilter) {
                        try {
                            dispatch(setIsLoadingQuery(true));
                            const { data } = await queryFulfilled;
                            dispatch(setExistResult(data.meta.total));
                            dispatch(setIsLoadingQuery(false));
                        } catch (_error: unknown) {
                            dispatch(setIsLoadingQuery(false));
                        }
                    }
                },
                transformResponse: transformRecipesProteinsResponse,
                transformErrorResponse: transformErrorResponse,
            }),
            getRecipesBySubcategoryId: builder.query<RecipesResponse, ResponseParamsWithId>({
                query: ({ id, ...params }) => ({
                    url: `${ApiEndpoints.RECIPE_CATEGORY}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPES_BY_SUBCATEGORY,
                    params: params,
                }),
                transformResponse: transformRecipesProteinsResponse,
                transformErrorResponse: transformErrorResponse,
            }),
            getRecipeById: builder.query<recipe, string | undefined>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPE}/${id}`,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPE,
                    name: EndpointNames.GET_RECIPE,
                }),
                transformResponse: transformRecipeProteinsResponse,
                transformErrorResponse: transformErrorResponse,
            }),
        }),
    });

export const { useGetRecipesQuery, useGetRecipesBySubcategoryIdQuery, useGetRecipeByIdQuery } =
    recipesApiSlice;
