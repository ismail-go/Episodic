class Api::StoriesController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]
  before_action :must_be_author, only: [:update, :destroy]

  def create
    @story = Story.new(story_params)

    if @story.save
      render :show
    else
      render json: @story.errors.full_messages
    end
  end

  def index
    @stories = Story.all
    render :index
  end

  def show
    @story = Story.find(params[:id])
    render :show
  end

  def update ###
    @story = Story.find(params[:id])
    @story.update!(params)
  end

  def destroy ###
    @story = Story.find(params[:id])
    @story.destroy
  end

  private
  def story_params
    params.require(:story).permit(:author_id, :title, :body)
  end

  def must_be_author
    @story = Story.find(params[:id])
    if @story.author_id != current_user.id
      render json: ["STOP TRYING TO HACK MY SITE, I'M TRYING TO GET A JOB HERE"], status: 401
    end
  end
end